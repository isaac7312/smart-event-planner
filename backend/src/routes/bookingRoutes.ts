import { Router } from 'express';
import { createBooking } from '../controllers/bookingController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// 🔐 LOGIN REQUIRED
router.post('/', authenticate, createBooking);

export default router;
