require('dotenv').config();
console.log("API Key Loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");
console.log("Starts with:", process.env.GEMINI_API_KEY.substring(0, 8));
const express = require('express');

const analyzeRoutes = require("./routes/analyzeRoutes");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/", analyzeRoutes);



app.listen(5000, () => console.log('Server running on port 5000'));