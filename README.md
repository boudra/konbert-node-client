# Konbert - File Conversion API Wrapper

Konbert API is a Node.js wrapper for the [Konbert.com](https://konbert.com) File Conversion API. It provides a convenient way to convert files between different formats such as JSON, CSV, Avro, and Excel. This wrapper simplifies the process of making API requests and handling file conversions.

## Installation

To use Konbert, you need to have Node.js installed. You can then install the package using npm:

```shell
npm install konbert-api
```

## Usage

Here's an example of how to use Konbert to convert files:

```typescript
import Konbert from 'konbert-api';

// Set up the API options
const options = {
  apiKey: 'YOUR_API_KEY',
};

// Create an instance of Konbert
const konbert = new Konbert(options);

// Specify the input and output formats
const input = 'csv';
const output = 'json';

// Call the convert method to perform the conversion
konbert.convert(inputData, input, output)
  .then((outputData) => {
    // Handle the converted file data
    // e.g., save the outputData to a file
  })
  .catch((error) => {
    // Handle any errors that occur during conversion
    console.error('Conversion failed:', error);
  });
```

Make sure to replace `'YOUR_API_KEY'` with your actual API key.

The `convert` method accepts the following parameters:

- `inputData`: The input data to be converted. It can be a string, Buffer, Blob, or an HTTPInput object containing the URL and headers.
- `input`: The input format. It can be one of the following: `'csv'`, `'json'`, `'avro'`, or `'excel'`. You can also provide additional options specific to the input format.
- `output`: The output format. It can be one of the following: `'csv'`, `'json'`, `'avro'`, or `'excel'`. You can also provide additional options specific to the output format.

The `convert` method returns a Promise that resolves to a Blob containing the converted file data.

For more details about the available options and formats, refer to the [Konbert API documentation](https://konbert.com/docs).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a new issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
