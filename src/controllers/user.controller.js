import {
  deleteModalityUser,
  getModalitiesByUser,
  insertModalityUser,
  selectAllUsers,
  selectUserById,
  update,
  deleteUserById,
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

/***********************************************************DELETE****************************************/

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await deleteUserById(userId);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error eliminando usuario' });
  }
};