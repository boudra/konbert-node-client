import fetch from "node-fetch";

export interface Options {
  apiKey: string;
  host?: string;
}

export type InputOptions = JsonInputOptions | CsvInputOptions;

type JsonInputOptions =
  | "json"
  | {
      format: "json";
      options?: {
        flatten_objects?: boolean;
        mode: "array" | "ndjson";
      };
    };

type CsvInputOptions =
  | "csv"
  | {
      format: "csv";
      options?: {
        delimiter?: string;
        has_headers?: boolean;
        encoding?: string;
      };
    };

export type OutputOptions = JsonOutputOptions | CsvOutputOptions;

type JsonOutputOptions =
  | "json"
  | {
      format: "json";
      options?: {
        mode: "array" | "ndjson";
      };
    };

type CsvOutputOptions =
  | "csv"
  | {
      format: "csv";
      options?: {
        delimiter?: string;
      };
    };

type ConversionResponse = {
  message: string;
};

type HTTPInput = {
  url: string;
  headers?: Record<string, string>;
};

export default class Konbert {
  private apiKey: string;
  private endpoint: string;

  constructor(options: Options) {
    this.apiKey = options.apiKey;
    this.endpoint = options.host || "https://konbert.com";
  }

  async convert(
    inputData: string | Buffer | Blob | HTTPInput,
    input: InputOptions,
    output: OutputOptions
  ): Promise<Blob> {
    const path = "/api/v1/convert";

    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
    };

    const body = new FormData();

    if (
      inputData instanceof Blob ||
      inputData instanceof Buffer ||
      typeof inputData === "string"
    ) {
      body.append("input[data]", new Blob([inputData]));
    } else {
      body.append("input[http][url]", inputData.url);
      if (inputData.headers) {
        for (const [key, value] of Object.entries(inputData.headers)) {
          body.append(`input[http][headers][${key}]`, value.toString());
        }
      }
    }

    if (typeof input === "string") {
      body.append("input[format]", input);
    } else {
      body.append("input[format]", input.format);

      if (input.options) {
        for (const [key, value] of Object.entries(input.options)) {
          body.append(`input[options][${key}]`, value.toString());
        }
      }
    }

    if (typeof output === "string") {
      body.append("output[format]", output);
    } else {
      body.append("output[format]", output.format);

      if (output.options) {
        for (const [key, value] of Object.entries(output.options)) {
          body.append(`output[options][${key}]`, value.toString());
        }
      }
    }

    const response = await fetch(`${this.endpoint}${path}`, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = (await response.json()) as ConversionResponse;
      } catch (error) {
        throw new Error(`Conversion failed. Error: ${response.statusText}`);
      }

      const errorMessage = errorData?.message || response.statusText;
      throw new Error(`Conversion failed. Error: ${errorMessage}`);
    }

    return response.blob();
  }
}
