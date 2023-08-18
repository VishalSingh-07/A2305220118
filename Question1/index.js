const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8008;

app.get("/numbers", async (req, res) => {
  const urls = Array.isArray(req.query.url) ? req.query.url : [];
  const uniqueNumbers = new Set();

  for (const url of urls) {
    try {
      const response = await axios.get(url, { timeout: 500 });
      const numbers = response.data.numbers;
      numbers.forEach((num) => uniqueNumbers.add(num));
    } catch (error) {
      res.status(400).json(`Error fetching data from ${url}: ${error.message}`);
      return;
    }
  }

  const sortedNumbers = [...uniqueNumbers].sort((a, b) => a - b);
  res.json({ numbers: sortedNumbers });
});

app.listen(PORT, function () {
  console.log(`Server started on Port ${PORT}`);
});
