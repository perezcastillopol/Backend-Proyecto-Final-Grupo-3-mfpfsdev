import db from "../../config/db.js";

/***********************************************************GET****************************************/

export const selectAllUsers = async () => {
  const [result] = await db.query("SELECT * FROM users");
  return result;
};

export const selectUserById = async (userId) => {
  const [result] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
  if (result.length === 0) return null;
  return result[0];
};

/**
 * Buscar usuario por email (para login)
 */
export const selectUserByEmail = async (email) => {
  const [result] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
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
  birthDate,
  phone,
  location,
}) => {
  const sql = `
    INSERT INTO users (name, email, password_hash, photo_url, bio, birthDate, phone, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    email,
    password_hash,
    photo_url,
    bio,
    birthDate,
    phone,
    location,
  ];

  const [result] = await db.query(sql, values);
  return result;
};

/***********************************************************UPDATE****************************************/

export const update = async (
  userId,
  { name, email, password_hash, photo_url, bio, birthDate, phone, location }
) => {
  const sql = `
    UPDATE users
    SET name = ?, email = ?, password_hash = ?, photo_url = ?, bio = ?, birthDate = ?, phone = ?, location = ?
    WHERE id = ?
  `;

  const values = [
    name,
    email,
    password_hash,
    photo_url,
    bio,
    birthDate,
    phone,
    location,
    userId,
  ];

  const [result] = await db.query(sql, values);
  return result;
};
