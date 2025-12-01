import db from  '../../config/db.js';

import {selectTripById} from './trip.model.js'
import {selectUsersAcceptedTripReview} from './participant.model.js'

export const insertReviewTransactional = async (tripId, reviewerId, revieweeId, rating, comment) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        const tripRows = await selectTripById(tripId);
        if (!tripRows.length) {
            throw { status: 404, message: "Trip no encontrado" };
        }
        const trip = tripRows[0];

        const now = new Date();
        const tripEnded = trip.status === "closed" || (trip.end_date && new Date(trip.end_date) < now);
        if (!tripEnded) {
            throw { status: 400, message: "El viaje aún no ha finalizado" };
        }

        const parts = await selectUsersAcceptedTripReview(tripId, reviewerId, revieweeId);
        if (parts.length < 2) {
            throw { status: 403, message: "Ambos usuarios deben ser participantes aceptados del viaje" };
        }

        if (await reviewExistsForPair(tripId, reviewerId, revieweeId)) {
            throw { status: 409, message: "Ya existe una valoración para este par en este viaje" };
        }

        const ins = await insertReview(tripId, reviewerId, revieweeId, rating, comment);

        await conn.commit();
        return { insertId: ins.insertId };
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

export const insertReview = async (tripId, reviewerId, revieweeId, rating, comment) => {
    const [result] = await db.query(
        `INSERT INTO reviews (trip_id, reviewer_id, reviewee_id, rating, comment)
     VALUES (?, ?, ?, ?, ?)`,
        [tripId, reviewerId, revieweeId, rating, comment]
    );
    return result;
};

export const selectReviewById = async (reviewId) => {
    const [rows] = await db.query(
        `SELECT * FROM reviews WHERE id = ?`,
        [reviewId]
    );
    return rows[0] || null;
};

export const updateReviewById = async (reviewId, rating, comment) => {
    const [result] = await db.query(
        `UPDATE reviews SET rating = ?, comment = ?
     WHERE id = ?`,
        [rating, comment, reviewId]
    );
    return result;
};

export const deleteReviewById = async (reviewId) => {
    const [result] = await db.query(
        `DELETE FROM reviews WHERE id = ?`,
        [reviewId]
    );
    return result;
};

export const selectTripReviews = async (tripId) => {
    const [rows] = await db.query(
        `SELECT r.*, u.name AS reviewer_name, u.photo_url AS reviewer_photo
     FROM reviews r
     JOIN users u ON u.id = r.reviewer_id
     WHERE r.trip_id = ?
     ORDER BY r.created_at DESC`,
        [tripId]
    );
    return rows;
};

export const reviewExistsForPair = async (tripId, reviewerId, revieweeId) => {
    const [rows] = await db.query(
        `SELECT id FROM reviews
     WHERE trip_id = ? AND reviewer_id = ? AND reviewee_id = ?`,
        [tripId, reviewerId, revieweeId]
    );
    return rows.length > 0;
};