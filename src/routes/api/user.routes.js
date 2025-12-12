import { Router } from "express";
import * as userController from "../../controllers/user.controller.js";
import { checkIdUser } from "../../middlewares/users.middlewares.js";

const router = Router();

// Listar usuarios
router.get("/", userController.getAllUsers);

// LOGIN
router.post("/login", userController.loginUser);

// Enviar notificación
router.post("/notify", userController.sendNotification);

// Obtener usuario por id
router.get("/:userId", checkIdUser, userController.getUserById);

// Crear usuario
router.post("/", userController.createUser);

// Actualizar usuario
router.put("/:userId", checkIdUser, userController.updateUser);

export default router;