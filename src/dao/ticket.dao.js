import { TicketModel } from '../models/ticket.model.js';

class TicketDAO {
  async create(ticketData) {
    return await TicketModel.create(ticketData);
  }

  async getAll() {
    return await TicketModel.find();
  }

  async getById(id) {
    return await TicketModel.findById(id);
  }
}

export default new TicketDAO();