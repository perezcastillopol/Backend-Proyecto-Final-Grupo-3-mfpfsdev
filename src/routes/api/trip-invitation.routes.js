import express from 'express';
import * as tripInvitationController from '../../controllers/trip-invitation.controller.js';

const router = express.Router();
/**
 * POST /api/trips/:tripId/invitations
 * Create a new invitation request
 */
router.post('/trips/:tripId/invitations', tripInvitationController.createInvitation);
/**
 * GET /api/trips/:tripId/invitations
 * Get all invitations for a trip (owner only)
 */
router.get('/trips/:tripId/invitations', tripInvitationController.getInvitations);
/**
 * PUT /api/trips/:tripId/invitations/:invitationId
 * Accept or reject an invitation
 */
router.put('/trips/:tripId/invitations/:invitationId', tripInvitationController.respondToInvitation);
/**
 * GET /api/trips/:tripId/invitations/history
 * Get invitation history for a trip
 */
router.get('/trips/:tripId/invitations/history', tripInvitationController.getInvitationHistory);

export default router;