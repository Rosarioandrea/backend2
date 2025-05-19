import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserManager from '../managers/user.manager.js'; 

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