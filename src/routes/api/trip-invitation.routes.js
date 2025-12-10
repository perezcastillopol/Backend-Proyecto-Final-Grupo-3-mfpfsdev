import express from 'express';
import * as tripRequestController from '../../controllers/trip-invitation.controller.js';
import * as tripInvitationController from '../../controllers/trip-invitation.controller.js';
import {authenticate} from "../../middlewares/auth.middlewares.js";

const router = express.Router();

// Usuario solicita unirse a un viaje
router.post('/trips/:tripId/requests', tripRequestController.createRequest);

// Ver todas las solicitudes para un viaje
router.get('/trips/:tripId/requests', tripRequestController.getRequests);

// Responder a una solicitud (aceptar/rechazar)
router.put('/trips/:tripId/requests/:requestId', tripRequestController.respondToRequest);

// Ver historial de solicitudes
router.get('/trips/:tripId/requests/history', tripRequestController.getRequestHistory);

export default router;