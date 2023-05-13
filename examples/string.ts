import Konbert from "../src/index.js";

(async () => {
  // Example Usage
  const apiKey = "YOUR_API_KEY";
  const konbert = new Konbert({ apiKey });

  const data = JSON.stringify([
    {
      name: "John Doe",
      age: 30,
      city: "New York",
    },
    {
      name: "Jane Doe",
      age: 25,
      city: "San Francisco",
    },
  ]);

  try {
    const result = await konbert.convert(data, "json", "csv");

    console.log("Conversion successful:", result.toString());
  } catch (error) {
    console.log("Conversion failed. Error:", error);
  }
})();
