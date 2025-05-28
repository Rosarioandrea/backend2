import TicketDAO from '../dao/ticket.dao.js';
import { v4 as uuidv4 } from 'uuid';

class TicketService {
  async createTicket(amount, purchaser) {
    const ticket = {
      code: uuidv4(),
      amount,
      purchaser
    };
    return await TicketDAO.create(ticket);
  }
}

export default new TicketService();