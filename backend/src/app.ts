import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import "./config/db";

// Routes
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

/* ---------- CORS CONFIG (FIXED) ---------- */
app.use(
  cors({
    origin: true,        // ✅ allows Netlify, mobile, localhost
    credentials: true,   // ✅ allow cookies / auth headers
  })
);

/* ---------- BODY PARSERS ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- ROUTES ---------- */
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/dashboard", dashboardRoutes);

/* ---------- HEALTH CHECK ---------- */
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is running 🚀",
  });
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
