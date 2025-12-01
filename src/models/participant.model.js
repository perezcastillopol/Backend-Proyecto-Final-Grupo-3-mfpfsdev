import db from  '../../config/db.js';

export const selectUsersAcceptedTripReview = async (tripId, reviewerId, revieweeId) => {
    const [result] = await db.query (
        `SELECT user_id FROM participants
         WHERE trip_id = ?
         AND user_id IN (?, ?)
         AND accepted_at IS NOT NULL`,
        [tripId, reviewerId, revieweeId]
    );
    if (result.length === 0)return null;   
    return result;
}
