import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middlewares.js";
import {
    createReview,
    getTripReviews,
    updateReview,
    deleteReview
} from "../../controllers/review.controller.js";

import {
    validateReviewPayload,
    ensureReviewExists
} from "../../middlewares/review.middlewares.js";

const router = Router();

router.post(
    "/:tripId/reviews",
    authenticate,
    validateReviewPayload,
    createReview
);

router.get(
    "/:tripId/reviews",
    authenticate,
    getTripReviews
);

router.put(
    "/:tripId/reviews/:reviewId",
    authenticate,
    ensureReviewExists,
    validateReviewPayload,
    updateReview
);

router.delete(
    "/:tripId/reviews/:reviewId",
    authenticate,
    ensureReviewExists,
    deleteReview
);

export default router;