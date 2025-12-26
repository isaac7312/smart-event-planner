import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  deleteEvent,
  updateEvent
} from '../controllers/eventController';

const router = express.Router();

router.post('/', createEvent);       // ⭐ THIS WAS MISSING
router.get('/', getAllEvents);
router.get('/my-events', getMyEvents);
router.get('/:id', getEventById);
router.delete('/:id', deleteEvent);
router.put('/:id', updateEvent);

export default router;
