import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import {insertModalityUser, insertUser, selectUserByEmail, selectUserById} from "../models/user.model.js";

/***********************************************************LOGIN****************************************/

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validación básica
    if (!email || !password) {
      return res
          .status(400)
          .json({ message: 'Email y contraseña son obligatorios' });
    }

    // 2. Buscar usuario por email
    const user = await selectUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 3. Comparar contraseña con el hash guardado en password_hash
    const passwordMatch = await bcrypt.compare(password, user.password_hash || '');

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 4. Generar token JWT
    const token = jwt.sign(
        {
          sub: user.id,
          email: user.email,
          name: user.name,
        },
        process.env.JWT_SECRET || 'dev-secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    // 5. No enviar el password_hash al frontend
    const { password_hash, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: 'Login correcto',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error en loginUser:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const register = async (req, res) => {
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