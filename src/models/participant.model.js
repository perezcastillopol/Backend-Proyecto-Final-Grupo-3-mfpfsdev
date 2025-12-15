import db from  '../../config/db.js';

export const selectUsersAcceptedTripReview = async (tripId, reviewerId, revieweeId) => {
    const [result] = await db.query (
        `SELECT user_id FROM participants
         WHERE trip_id = ?
         AND user_id IN (?, ?)
         AND accepted_at IS NOT NULL`,
        [tripId, reviewerId, revieweeId]
    );
    return result;
}

export const selectAcceptedParticipantsByTrip = async (tripId) => {
    const [rows] = await db.query(
        `SELECT u.id, CONCAT_WS(' ', u.name, u.last_name) AS name, u.photo_url
         FROM participants p
         JOIN users u ON u.id = p.user_id
         WHERE p.trip_id = ?
         AND p.accepted_at IS NOT NULL
         ORDER BY name ASC`,
        [tripId]
    );
    return rows;
}

export const isParticipantOfTrip = async (tripId, userId) => {
    const [result] = await db.query ('select exists(select 1 from participants where trip_id = ? and user_id = ?) as is_participant',[tripId, userId]);
    return result;
}

export const addParticipantToTrip = async (tripId, userId) => {
    const [result] = await db.query(
        'INSERT INTO participants (trip_id, user_id, accepted_at) VALUES (?, ?, NOW())',
        [tripId, userId]
    );
    return result;
}