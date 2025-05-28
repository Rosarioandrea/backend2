import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserManager from '../managers/user.manager.js';

// Registro
export const register = async (req, res) => {
  try {
    const newUser = await UserManager.registerUser(req.body);
    return res.status(201).json({ message: 'Usuario registrado', user: newUser });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    return res.status(400).json({ error: error.message || 'Error al registrar usuario' });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserManager._getRawUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.cookie('token', token, { httpOnly: true }).json({ message: 'Login exitoso' });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return res.status(500).json({ error: err.message || 'Error en el servidor' });
  }
};
