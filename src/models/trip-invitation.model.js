
import db from '../../config/db.js'; 

export const findByUserAndTrip = async (tripId, userId, statuses = []) => {
    let query = 'SELECT * FROM trip_requests WHERE trip_id = ? AND user_id = ?';
    const params = [tripId, userId];
    if (statuses.length > 0) {
        const placeholders = statuses.map(() => '?').join(',');
        query += ` AND status IN (${placeholders})`;
        params.push(...statuses);
    }
    const [rows] = await db.query(query, params);
    return rows;
};

export const create = async (tripId, userId, note = null) => {
    const [result] = await db.query(
        'INSERT INTO trip_requests (trip_id, user_id, note, requested_at, status) VALUES (?, ?, ?, NOW(), "pending")',
        [tripId, userId, note]
    );
    return await findById(result.insertId);
};

export const findById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM trip_requests WHERE id = ?',
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
};

export const findByIdAndTrip = async (id, tripId) => {
    const [rows] = await db.query(
        'SELECT * FROM trip_requests WHERE id = ? AND trip_id = ?',
        [id, tripId]
    );
    return rows.length > 0 ? rows[0] : null;
};

export const findByTripId = async (tripId) => {
    const [rows] = await db.query(
        'SELECT * FROM trip_requests WHERE trip_id = ? ORDER BY requested_at DESC',
        [tripId]
    );
    return rows;
};

export const updateStatus = async (id, status, responderId) => {
    await db.query(
        'UPDATE trip_requests SET status = ?, responded_at = NOW(), responder_id = ? WHERE id = ?',
        [status, responderId, id]
    );
    return await findById(id);
};

export const getHistory = async (tripId) => {
    return await findByTripId(tripId);
};

export const getPendingByTripId = async (tripId) => {
    const [rows] = await db.query(
        'SELECT * FROM trip_requests WHERE trip_id = ? AND status = "pending" ORDER BY requested_at DESC',
        [tripId]
    );
    return rows;
};