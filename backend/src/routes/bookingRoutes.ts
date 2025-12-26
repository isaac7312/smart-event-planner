import { Router } from 'express';
import { createBooking } from '../controllers/bookingController';

const router = Router();

// 🔐 LOGIN REQUIRED
router.post('/', createBooking);

export default router;
