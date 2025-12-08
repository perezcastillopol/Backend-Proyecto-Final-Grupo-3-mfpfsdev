import {Router} from "express";
import {loginUser, register} from "../../controllers/auth.controller.js";
import {getNickName} from "../../middlewares/users.middlewares.js";
import {hashPassword} from "../../middlewares/auth.middlewares.js";

const router = Router();

router.post('/login', loginUser)
router.post('/register', getNickName, hashPassword, register);

export default router;