import express from 'express';
import { createRequest,getRequests,respondToRequest,getRequestHistory,getMyRequest } from '../../controllers/trip-requests.controller.js';
import {authenticate} from "../../middlewares/auth.middlewares.js";

const router = express.Router();

// Ver historial de solicitudes (debe ir antes de /:tripId para evitar conflictos)
router.get('/:tripId/history', getRequestHistory);

// Ver mi propia solicitud para un viaje (debe ir antes de /:tripId)
router.get('/:tripId/my-request', authenticate, getMyRequest);

// Usuario solicita unirse a un viaje
router.post('/:tripId', authenticate, createRequest);

// Ver todas las solicitudes para un viaje
router.get('/:tripId', authenticate, getRequests);

// Responder a una solicitud (aceptar/rechazar)
router.put('/:tripId/:requestId', authenticate, respondToRequest);

export default router;