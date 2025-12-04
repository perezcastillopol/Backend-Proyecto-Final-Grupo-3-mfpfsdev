
import * as TripInvitation from '../models/trip-invitation.model.js';

export const createInvitation = async (req, res) => {
    const { tripId } = req.params;
    const { userId, note } = req.body;
    try {
        // Check if user already has a pending or accepted invitation
        const existing = await TripInvitation.findByUserAndTrip(
            tripId,
            userId,
            ['pending', 'accepted']
        );
        if (existing.length > 0) {
            return res.status(400).json({
                error: 'Ya tienes una invitación pendiente o aceptada para este viaje'
            });
        }
        // Create the invitation
        const invitation = await TripInvitation.create(tripId, userId, note);
        res.status(201).json(invitation);
    } catch (error) {
        console.error('Error creating invitation:', error);
        res.status(500).json({ error: 'Error al crear la invitación' });
    }
};

export const getInvitations = async (req, res) => {
    const { tripId } = req.params;
    try {
        const invitations = await TripInvitation.findByTripId(tripId);
        res.json(invitations);
    } catch (error) {
        console.error('Error fetching invitations:', error);
        res.status(500).json({ error: 'Error al obtener las invitaciones' });
    }
};

export const respondToInvitation = async (req, res) => {
    const { tripId, invitationId } = req.params;
    const { status, responderId } = req.body;
    // Validate status
    if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({
            error: 'Estado inválido. Debe ser "accepted" o "rejected"'
        });
    }
    try {

        const invitation = await TripInvitation.findByIdAndTrip(invitationId, tripId);
        if (!invitation) {
            return res.status(404).json({ error: 'Invitación no encontrada' });
        }
        // Update the invitation
        const updated = await TripInvitation.updateStatus(invitationId, status, responderId);
        res.json(updated);
    } catch (error) {
        console.error('Error responding to invitation:', error);
        res.status(500).json({ error: 'Error al responder a la invitación' });
    }
};

export const getInvitationHistory = async (req, res) => {
    const { tripId } = req.params;
    try {
        const invitations = await TripInvitation.getHistory(tripId);
        res.json(invitations);
    } catch (error) {
        console.error('Error fetching invitation history:', error);
        res.status(500).json({ error: 'Error al obtener el historial de invitaciones' });
    }
};
