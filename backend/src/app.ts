import dotenv from "dotenv";
dotenv.config();

import "./config/db";
import express from "express";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

/* ---------- MIDDLEWARES (VERY IMPORTANT ORDER) ---------- */
app.use(cors());
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // ⭐ FIX

/* ---------- ROUTES ---------- */
app.use("/events", eventRoutes);
app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);

/* ---------- HEALTH CHECK ---------- */
app.get("/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

/* ---------- SERVER ---------- */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
