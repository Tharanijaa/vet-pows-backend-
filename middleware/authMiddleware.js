import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../ config/models/User.js';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const roles = ['user', 'doctor', 'admin'];
  if (!roles.includes(role)) {
    return res.status(400).json({ msg: 'Invalid role' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ msg: 'Email already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });

  res.status(201).json({ msg: 'User registered successfully', role: user.role });
};
