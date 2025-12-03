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

export const insertUser = async ({
  name,
  email,
  password_hash,
  photo_url,
  bio,
  interests,
}) => {
  const [result] = await db.query(
    'insert into users (name, email, password_hash, photo_url, bio, interests) values (?,?,?,?,?,?)',
    [name, email, password_hash, photo_url, bio, interests]
  );
  return result;
};

/***********************************************************UPDATE****************************************/

export const update = async (
  userId,
  { name, email, password_hash, photo_url, bio, interests }
) => {
  const [result] = await db.query(
    'update users set name = ?, email = ?, password_hash = ?, photo_url = ?, bio = ?, interests = ? where id = ?',
    [name, email, password_hash, photo_url, bio, interests, userId]
  );
  return result;
};