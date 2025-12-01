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
    "/",
    authenticate,
    validateReviewPayload,
    createReview
);

router.get(
    "/trip/:tripId",
    authenticate,
    getTripReviews
);

router.put(
    "/:reviewId",
    authenticate,
    ensureReviewExists,
    validateReviewPayload,
    updateReview
);

router.delete(
    "/:reviewId",
    authenticate,
    ensureReviewExists,
    deleteReview
);

export default router;