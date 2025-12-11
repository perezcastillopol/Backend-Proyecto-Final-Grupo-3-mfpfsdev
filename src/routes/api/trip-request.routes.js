import express from 'express';
import { createRequest,getRequests,respondToRequest,getRequestHistory } from '../../controllers/trip-request.controller.js'; 
import {authenticate} from "../../middlewares/auth.middlewares.js";

const router = express.Router();

// Usuario solicita unirse a un viaje
router.post('/:tripId', authenticate, createRequest);

// Ver todas las solicitudes para un viaje
router.get('/:tripId', authenticate, getRequests);

// Responder a una solicitud (aceptar/rechazar)
router.put('/:tripId/:requestId', authenticate, respondToRequest);

// Ver historial de solicitudes
router.get('/:tripId/history', getRequestHistory);

export default router;