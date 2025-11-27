import { insertUser, selectAllUsers, selectUserById, update } from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
  const users = await selectAllUsers();
  res.json(users);
};

export const getUserById = async (req, res) =>{
  res.json(req.user)
}



export const createUser = async(req, res) =>{
  const {insertId} = await insertUser (req.body);
  const result = await selectUserById (insertId);
  res.json(result)

}


export const updateUser = async (req, res) =>{
  console.log('entro al controller');
  const {userId} = req.params;
  await update(userId, req.body);
  const result = await selectUserById(userId);
  res.json(result);
}