import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents
} from "../controllers/eventController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// ✅ Routes
router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.get("/my-events", authenticate, getMyEvents);

export default router;
