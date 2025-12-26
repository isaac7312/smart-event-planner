import dotenv from "dotenv";
dotenv.config();

import "./config/db";
import express from "express";
import cors from "cors";
import eventRoutes from './routes/eventRoutes';
import userRoutes from "./routes/userRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import dashboardRoutes from './routes/dashboardRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/events', eventRoutes);
app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use('/api', dashboardRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/auth', authRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
