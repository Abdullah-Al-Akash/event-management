import express from 'express';
import {
  createEvent,
  getAllEvents,
  getMyEvents,
  updateEvent,
  deleteEvent,
  joinEvent
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllEvents);
router.post('/', protect, createEvent);
router.get('/my', protect, getMyEvents);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);
router.post('/:id/join', protect, joinEvent);

export default router;
