import db from '../../config/db.js';

/***********************************************************GET****************************************/

export const selectAllUsers = async () => {
  const [result] = await db.query('select * from users');
  return result;
};

export const selectUserById = async (userId) => {
  const [result] = await db.query('select * from users where id = ?', [userId]);
  if (result.length === 0) return null;
  return result[0];
};

/**
 * Buscar usuario por email (para login)
 */
export const selectUserByEmail = async (email) => {
  const [result] = await db.query('select * from users where email = ?', [email]);
  if (result.length === 0) return null;
  return result[0];
};

/***********************************************************INSERT*************************************/

export const insertUser = async (userData) => {
  const {
    name,
    email,
    password_hash,
    photo_url,
    bio,
    birthDate,
    phone,
    location,
    nickname,
    last_name
  } = userData;

  try {
    const [result] = await db.query(`insert into users (name, email, password_hash, photo_url, bio, birthDate, phone, location, nickname, last_name) 
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[name,email,password_hash,photo_url,bio,birthDate,phone,location,nickname,last_name]);
    return result;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      const customError = new Error("El email ya existe en la base de datos");
      customError.status = 400;
      throw customError;
    }
    throw error;
  }
};

export const insertModalityUser = async ({users_id, id}) => {
  const [result] = await db.query ('insert into user_modality (users_id, modality_trip_id) values (?,?)', [users_id, id]);
  return result;
};

export const deleteModalityUser = async (users_id) => {
  const [result] = await db.query ('delete from user_modality where users_id = ?', [users_id]);
  return result;
}

export const getModalitiesByUser = async (userId) => {
  const [result] = await db.query('select * from user_modality where users_id = ?', [userId]);
  if (result.length === 0) return null;
  return result;
}
/***********************************************************UPDATE****************************************/

export const update = async (
  userId,{ name, email, password_hash, photo_url, bio, birthDate, phone, location, last_name }) => {
  try {
    const [result] = await db.query(`update users set name = ?, email = ?, password_hash = ?, photo_url = ?, bio = ?, birthDate = ?, phone = ?, location = ?, last_name = ? where id = ?`,[name, email, password_hash, photo_url, bio, birthDate, phone, location, last_name, userId]);
    return result;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      const customError = new Error("El email ya está registrado");
      customError.status = 400;
      throw customError;
    }
    throw error;
  }
};