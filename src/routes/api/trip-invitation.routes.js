import express from 'express';
import * as tripInvitationController from '../../controllers/trip-invitation.controller.js';

const router = express.Router();

router.post('/trips/:tripId/invitations', tripInvitationController.createInvitation);

router.get('/trips/:tripId/invitations', tripInvitationController.getInvitations);

router.put('/trips/:tripId/invitations/:invitationId', tripInvitationController.respondToInvitation);

router.get('/trips/:tripId/invitations/history', tripInvitationController.getInvitationHistory);

export default router;