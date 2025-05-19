import { Ticket } from '../models/ticket.model.js';

class TicketDAO {
  async create(ticketData) {
    const ticket = new TicketModel(ticketData);
    return await ticket.save();
  }

  async getById(id) {
    return await TicketModel.findById(id);
  }

  async getAll() {
    return await TicketModel.find();
  }

}

export default new TicketDAO();