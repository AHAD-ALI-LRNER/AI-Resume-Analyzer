require('dotenv').config();
console.log("API Key Loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");
console.log("Starts with:", process.env.GEMINI_API_KEY.substring(0, 8));
const express = require('express');

const analyzeroutes = require("./routes/analyzeroutes");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/", analyzeroutes);



const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Resume Analyzer Backend is Running 🚀",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});