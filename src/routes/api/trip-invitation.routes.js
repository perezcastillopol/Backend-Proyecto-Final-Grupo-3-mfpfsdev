import express from 'express';
import * as tripInvitationController from '../../controllers/trip-invitation.controller.js';
import {authenticate} from "../../middlewares/auth.middlewares.js";

const router = express.Router();

router.get('/trips/:tripId/invitations', tripInvitationController.getInvitations);

router.get('/trips/:tripId/invitations/history', tripInvitationController.getInvitationHistory);

router.use(authenticate)

router.put('/trips/:tripId/invitations/:invitationId', tripInvitationController.respondToInvitation);

router.post('/trips/:tripId/invitations', tripInvitationController.createInvitation);

export default router;