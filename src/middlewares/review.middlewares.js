import {selectReviewById} from '../models/review.model.js';

export const validateReviewPayload = (req, res, next) => {
    const { reviewee_id, rating } = req.body;

    if (!Number.isInteger(reviewee_id)) {
        return res.status(400).json({ message: "reviewee_id debe ser un número" });
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "rating debe ser entero entre 1 y 5" });
    }

    next();
};

export const ensureReviewExists = async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await selectReviewById(reviewId);
    if (!review) {
        return res.status(404).json({ message: "Review no encontrada" });
    }

    req.review = review;
    next();
};