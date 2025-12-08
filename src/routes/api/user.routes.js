import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../../controllers/user.controller.js';
import { checkIdUser, getNickName, hashPassword } from '../../middlewares/users.middlewares.js';

const router = Router();

// Listar usuarios
router.get('/', getAllUsers);

// Obtener usuario por id
router.get('/:userId', checkIdUser, getUserById);

// Crear usuario
router.post('/', getNickName, hashPassword, createUser);

// Actualizar usuario
router.put('/:userId', checkIdUser, updateUser);

export default router;