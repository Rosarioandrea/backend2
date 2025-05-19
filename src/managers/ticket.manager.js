import TicketDAO from '../dao/ticket.dao.js';
import { TicketDTO } from '../dtos/ticket.dto.js';

class TicketManager {
  async createTicket(ticketData) {
    const ticket = await TicketDAO.create(ticketData);
    return new TicketDTO(ticket);
  }

  async getTicketById(id) {
    const ticket = await TicketDAO.getById(id);
    if (!ticket) return null;
    return new TicketDTO(ticket);
  }

  async getAllTickets() {
    const tickets = await TicketDAO.getAll();
    return tickets.map(ticket => new TicketDTO(ticket));
  }
}

export default new TicketManager();