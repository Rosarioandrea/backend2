import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserManager from '../managers/user.manager.js';
import UserModel from '../models/user.model.js';  

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserManager.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login exitoso' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// REGISTER
export const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await UserManager.getUserByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'Usuario ya existe' });

    const newUser = await UserManager.registerUser({ email, password, role });
    res.status(201).json({ message: 'Usuario registrado', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};