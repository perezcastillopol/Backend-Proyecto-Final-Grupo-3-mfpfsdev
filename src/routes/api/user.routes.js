import {Router} from 'express';
import {getAllUsers, getUserById, updateUser,} from '../../controllers/user.controller.js';
import {checkIdUser} from '../../middlewares/users.middlewares.js';
import {authenticate} from "../../middlewares/auth.middlewares.js";
import {deleteUser} from "../../controllers/user.controller.js";

const router = Router();

router.use(authenticate)

// Listar usuarios
router.get('/', getAllUsers);

// Obtener usuario por id
router.get('/:userId', checkIdUser, getUserById);

// Actualizar usuario
router.put('/:userId', checkIdUser, updateUser);

// Eliminar Usuario
router.delete('/:userId', checkIdUser, deleteUser);

export default router;