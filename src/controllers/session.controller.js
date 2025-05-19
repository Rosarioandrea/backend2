import userManager from '../managers/user.manager.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userManager.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false, 
      })
      .json({ message: 'Login exitoso' });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};