import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
} from '../../controllers/user.controller.js';
import { checkIdUser, getNickName } from '../../middlewares/users.middlewares.js';

const router = Router();

// Listar usuarios
router.get('/', getAllUsers);

// LOGIN (antes de :userId para que no lo confunda con un id)
router.post('/login', loginUser);

// Obtener usuario por id
router.get('/:userId', checkIdUser, getUserById);

// Crear usuario
router.post('/', getNickName, createUser);

// Actualizar usuario
router.put('/:userId', checkIdUser, updateUser);

export default router;