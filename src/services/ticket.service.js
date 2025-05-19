import TicketDAO from '../dao/ticket.dao.js';
import { generateCode } from '../utils/generateCode.js';

class TicketService {
  async createTicket(purchaser, amount) {
    const ticket = {
      code: generateCode(),
      purchase_datetime: new Date(),
      amount,
      purchaser,
    };
    return await TicketDAO.create(ticket);
  }
}

export default new TicketService();