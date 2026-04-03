const express = require("express");
const cors = require("cors");
const tipsRouter = require("./routes/tips");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5500" })); // adjust if your frontend runs on a different port
app.use(express.json());

// Routes
app.use("/api/tips", tipsRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});