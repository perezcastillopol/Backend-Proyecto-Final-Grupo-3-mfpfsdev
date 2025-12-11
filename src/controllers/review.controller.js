import {
  deleteReviewById,
  insertReviewTransactional,
  selectReviewById,
  selectTripReviews,
  updateReviewById
} from '../models/review.model.js';

export const createReview = async (req, res) => {
  try {
    const reviewerId = req.userId;
    const { tripId, trip_id, reviewee_id, rating, comment } = req.body;
    const normalizedTripId = Number(tripId ?? trip_id);

    if (!Number.isInteger(normalizedTripId)) {
      return res.status(400).json({ message: "trip_id debe ser un número" });
    }

    if (reviewerId === reviewee_id) {
      return res.status(400).json({ message: "te estás valorando a ti mismo" });
    }

    const result = await insertReviewTransactional(normalizedTripId, reviewerId, reviewee_id, rating, comment || null);

    return res.status(201).json({ id: result.insertId });
  } catch (err) {
    if (err && err.status) {
      return res.status(err.status).json({ message: err.message });
    }
    if (err && err.errno === 1062) {
      return res.status(409).json({ message: "Ya existe una valoración idéntica" });
    }
    console.error("createReview error:", err);
    return res.status(500).json({ message: "Error interno" });
  }
};

export const getTripReviews = async (req, res) => {
  try {
    const tripId = Number(req.params.tripId);
    const rows = await selectTripReviews(tripId);
    return res.json(rows);
  } catch (err) {
    console.error("getTripReviews error:", err);
    return res.status(500).json({ message: "Error interno" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const reviewerId = req.userId;
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = req.review || await selectReviewById(reviewId);
    if (!review) return res.status(404).json({ message: "Review no encontrada" });
    if (review.reviewer_id !== reviewerId) return res.status(403).json({ message: "No puedes editar esta review" });

    await updateReviewById(reviewId, rating, comment || null);
    return res.json({ message: "Review actualizada" });
  } catch (err) {
    console.error("updateReview error:", err);
    return res.status(500).json({ message: "Error interno" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const reviewerId = req.userId;
    const { reviewId } = req.params;

    const review = req.review || await selectReviewById(reviewId);
    if (!review) return res.status(404).json({ message: "Review no encontrada" });
    if (review.reviewer_id !== reviewerId) return res.status(403).json({ message: "No puedes borrar esta review" });

    await deleteReviewById(reviewId);
    return res.json({ message: "Review eliminada" });
  } catch (err) {
    console.error("deleteReview error:", err);
    return res.status(500).json({ message: "Error interno" });
  }
};
