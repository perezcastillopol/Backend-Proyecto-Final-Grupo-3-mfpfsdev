import {Router} from 'express';
import {getAllUsers, getUserById, updateUser,} from '../../controllers/user.controller.js';
import {checkIdUser} from '../../middlewares/users.middlewares.js';

const router = Router();

// Listar usuarios
router.get('/', getAllUsers);

// Obtener usuario por id
router.get('/:userId', checkIdUser, getUserById);

// Actualizar usuario
router.put('/:userId', checkIdUser, updateUser);

export default router;