import Konbert from "../src/index.js";

(async () => {
  // Example Usage
  const apiKey = "YOUR_API_KEY";
  const konbert = new Konbert({ apiKey });

  try {
    const result = await konbert.convert(
      {
        url: "https://konbert.com/examples/example.json",
      },
      "json",
      "csv"
    );

    console.log("Conversion successful:", result.toString());
  } catch (error) {
    console.log("Conversion failed. Error:", error);
  }
})();
