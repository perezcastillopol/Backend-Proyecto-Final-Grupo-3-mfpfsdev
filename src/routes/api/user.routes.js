import { Router } from 'express';
import {createUser, getAllUsers, getUserById, updateUser} from '../../controllers/user.controller.js';
import {checkIdUser} from '../../middlewares/users.middlewares.js';



const router = Router();

router.get('/', getAllUsers);
router.get('/:userId', checkIdUser, getUserById);

router.post('/', createUser);

router.put('/:userId', checkIdUser, updateUser);

export default router;
