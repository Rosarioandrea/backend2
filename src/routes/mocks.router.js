import { Router } from 'express';
import UserModel from '../models/user.model.js';
import PetModel from '../models/pet.model.js';
import { generateMockUsers, generateMockPets } from '../utils/mockGenerators.js';

const router = Router();

// Endpoint GET /mockingusers genera 50 usuarios mock (sin guardar)
router.get('/mockingusers', (req, res) => {
  const users = generateMockUsers(50);
  res.json(users);
});

// Endpoint GET /mockingpets genera 50 mascotas mock (sin guardar)
router.get('/mockingpets', (req, res) => {
  const pets = generateMockPets(50);
  res.json(pets);
});

// Endpoint POST /generateData para crear usuarios y mascotas en DB
router.post('/generateData', async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  try {
    let createdUsers = [];
    let createdPets = [];

    if (users > 0) {
      const mockUsers = generateMockUsers(users);
      createdUsers = await UserModel.insertMany(mockUsers);
    }

    if (pets > 0) {
      const mockPets = generateMockPets(pets);
      createdPets = await PetModel.insertMany(mockPets);
    }

    res.json({
      message: 'Datos generados correctamente',
      usersCreated: createdUsers.length,
      petsCreated: createdPets.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


