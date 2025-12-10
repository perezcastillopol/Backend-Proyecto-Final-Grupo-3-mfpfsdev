import {
  deleteModalityUser,
  getModalitiesByUser,
  insertModalityUser,
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
  const { userId } = req.params;
  const mods = await getModalitiesByUser(userId);
  req.user.interests = mods;
  // checkIdUser ya mete el usuario en req.user
  res.json(req.user);
};

/***********************************************************UPDATE****************************************/

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  await deleteModalityUser(userId);
  await update(userId, req.body);
  const {interests} = req.body;
  if (Array.isArray(interests)) {
      for (const i of interests) {
        const {id} = i;
        await insertModalityUser({users_id: userId, id});
      }
  }
  const result = await selectUserById(userId);
  const mods = await getModalitiesByUser(userId);
  result.interests = mods;
  res.json(result);
};