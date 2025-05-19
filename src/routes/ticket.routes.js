import { Router } from 'express';
import {
  getTickets,
  getTicketById,
  createTicket
} from '../controllers/ticket.controller.js';

const router = Router();

router.get('/', getTickets);
router.get('/:id', getTicketById);
router.post('/', createTicket);

export default router;