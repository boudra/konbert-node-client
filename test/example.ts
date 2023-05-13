import fs from "fs/promises";
import Konbert from "../src/index.js";

(async () => {
  // Example Usage
  const apiKey = "YOUR_API_KEY";
  const konbert = new Konbert({ apiKey });

  const inputFile = await fs.readFile("path/to/input_file.csv");

  try {
    const result = await konbert.convert(inputFile, "json", "csv");

    console.log("Conversion successful:", result.toString());
  } catch (error) {
    console.log("Conversion failed. Error:", error);
  }
})();
