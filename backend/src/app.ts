import dotenv from "dotenv";
dotenv.config();

import "./config/db";
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/events", eventRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
