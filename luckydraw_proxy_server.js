
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post("/webhook", async (req, res) => {
  const { name, phone } = req.body;

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzv5Jp68jjb6mpkVedzGbw...你的GAS链接.../exec", {
      method: "POST",
      body: JSON.stringify({ name, phone }),
      headers: { "Content-Type": "application/json" },
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    console.error("Forwarding failed:", error);
    res.status(500).send("Forwarding error");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
