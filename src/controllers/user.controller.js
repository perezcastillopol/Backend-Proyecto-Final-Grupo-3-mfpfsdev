import {
  insertUser,
  selectAllUsers,
  selectUserById,
  update
  update,
  selectUserByEmail,
  insertModalityUser,
  deleteModalityUser,
  getModalitiesByUser
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
  console.log('esto recupero: ',mods)
  // checkIdUser ya mete el usuario en req.user
  res.json(req.user);
};

/***********************************************************INSERT*************************************/

export const createUser = async (req, res) => {
  try {
    const { insertId } = await insertUser(req.body);
    const { interests } = req.body;
    if (Array.isArray(interests)) {
      for (const i of interests) {
        const { id } = i;
        await insertModalityUser({ users_id: insertId, id });
      }
    }
    const result = await selectUserById(insertId);
    return res.json(result);

  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        message: "El email ya existe en nuestra base de datos"
      });
    }
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor"
    });
  }
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
  res.json(result);
};