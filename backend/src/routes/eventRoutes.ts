import express from 'express';
import { getAllEvents, getEventById, getMyEvents } from '../controllers/eventController';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/my-events', getMyEvents);
router.get('/:id', getEventById);

export default router;
