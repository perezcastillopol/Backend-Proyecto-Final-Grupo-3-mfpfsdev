import { selectAllUsers } from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
  const users = await selectAllUsers();
  res.json(users);
};