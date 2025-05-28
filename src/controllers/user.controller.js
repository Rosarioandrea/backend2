import UserManager from '../managers/user.manager.js';

export const getUsers = async (req, res) => {
  try {
    const users = await UserManager.getAllUsers(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const getUserById = async (req, res) => {
  try {
const user = await UserManager._getRawUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res
      .cookie('token', token, { httpOnly: true })
      .json({ message: 'Login exitoso' });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await UserManager.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error al crear usuario' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await UserManager.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error al actualizar usuario' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await UserManager.deleteUser(req.params.id);
    if (!result) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
