
import db from "../config/db.js"; 
/**
 * Create a new invitation request
 * POST /api/trips/:tripId/invitations
 */
export const createInvitation = async (req, res) => {
    const { tripId } = req.params;
    const { userId, note } = req.body;
    try {
        // Check if user already has a pending or accepted invitation
        const [existing] = await db.query(
            'SELECT * FROM trip_requests WHERE trip_id = ? AND user_id = ? AND status IN ("pending", "accepted")',
            [tripId, userId]
        );
        if (existing.length > 0) {
            return res.status(400).json({
                error: 'You already have a pending or accepted invitation for this trip'
            });
        }
        // Create the invitation
        const [result] = await db.query(
            'INSERT INTO trip_requests (trip_id, user_id, note, requested_at, status) VALUES (?, ?, ?, NOW(), "pending")',
            [tripId, userId, note || null]
        );
        // Fetch the created invitation
        const [invitation] = await db.query(
            'SELECT * FROM trip_requests WHERE id = ?',
            [result.insertId]
        );
        res.status(201).json(invitation[0]);
    } catch (error) {
        console.error('Error creating invitation:', error);
        res.status(500).json({ error: 'Failed to create invitation' });
    }
};
/**
 * Get all invitations for a trip
 * GET /api/trips/:tripId/invitations
 */
export const getInvitations = async (req, res) => {
    const { tripId } = req.params;
    try {
        const [invitations] = await db.query(
            'SELECT * FROM trip_requests WHERE trip_id = ? ORDER BY requested_at DESC',
            [tripId]
        );
        res.json(invitations);
    } catch (error) {
        console.error('Error fetching invitations:', error);
        res.status(500).json({ error: 'Failed to fetch invitations' });
    }
};
/**
 * Accept or reject an invitation
 * PUT /api/trips/:tripId/invitations/:invitationId
 */
export const respondToInvitation = async (req, res) => {
    const { tripId, invitationId } = req.params;
    const { status, responderId } = req.body;
    // Validate status
    if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status. Must be "accepted" or "rejected"' });
    }
    try {
        // Check if invitation exists and belongs to this trip
        const [invitation] = await db.query(
            'SELECT * FROM trip_requests WHERE id = ? AND trip_id = ?',
            [invitationId, tripId]
        );
        if (invitation.length === 0) {
            return res.status(404).json({ error: 'Invitation not found' });
        }
        // Update the invitation
        await db.query(
            'UPDATE trip_requests SET status = ?, responded_at = NOW(), responder_id = ? WHERE id = ?',
            [status, responderId, invitationId]
        );
        // Fetch the updated invitation
        const [updated] = await db.query(
            'SELECT * FROM trip_requests WHERE id = ?',
            [invitationId]
        );
        res.json(updated[0]);
    } catch (error) {
        console.error('Error responding to invitation:', error);
        res.status(500).json({ error: 'Failed to respond to invitation' });
    }
};
/**
 * Get invitation history for a trip
 * GET /api/trips/:tripId/invitations/history
 */
export const getInvitationHistory = async (req, res) => {
    const { tripId } = req.params;
    try {
        const [invitations] = await db.query(
            'SELECT * FROM trip_requests WHERE trip_id = ? ORDER BY requested_at DESC',
            [tripId]
        );
        res.json(invitations);
    } catch (error) {
        console.error('Error fetching invitation history:', error);
        res.status(500).json({ error: 'Failed to fetch invitation history' });
    }
};