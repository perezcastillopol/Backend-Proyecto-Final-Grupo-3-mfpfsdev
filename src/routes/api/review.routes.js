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

router.get(
    "/trip/:tripId",
    getTripReviews
);

router.use(authenticate)

router.post(
    "/",
    validateReviewPayload,
    createReview
);

router.put(
    "/:reviewId",
    ensureReviewExists,
    validateReviewPayload,
    updateReview
);

router.delete(
    "/:reviewId",
    ensureReviewExists,
    deleteReview
);

export default router;