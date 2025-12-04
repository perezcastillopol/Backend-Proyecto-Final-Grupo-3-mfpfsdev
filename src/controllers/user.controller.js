import {
  insertUser,
  selectAllUsers,
  selectUserById,
  update
} from '../models/user.model.js';

/***********************************************************GET****************************************/

export const getAllUsers = async (req, res) => {
  const users = await selectAllUsers();
  res.json(users);
};

export const getUserById = async (req, res) => {
  // checkIdUser ya mete el usuario en req.user
  res.json(req.user);
};

/***********************************************************INSERT*************************************/

export const createUser = async (req, res) => {
  const { insertId } = await insertUser(req.body);
  const result = await selectUserById(insertId);
  res.json(result);
};

/***********************************************************UPDATE****************************************/

export const updateUser = async (req, res) => {
  console.log('entro al controller');
  const { userId } = req.params;
  await update(userId, req.body);
  const result = await selectUserById(userId);
  res.json(result);
};