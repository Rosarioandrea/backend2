import TicketManager from '../managers/ticket.manager.js';

export const getTickets = async (req, res) => {
  try {
    const tickets = await TicketManager.getAllTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tickets' });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await TicketManager.getTicketById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket no encontrado' });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ticket' });
  }
};

export const createTicket = async (req, res) => {
  try {
    const ticket = await TicketManager.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear ticket' });
  }
};