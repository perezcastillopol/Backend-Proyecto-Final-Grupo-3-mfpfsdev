import { Router } from 'express';

import apiUser from "./api/user.routes.js";
import apiTrips from "./api/trip.routes.js";
import apiModality from "./api/modality.routes.js";
import apiReviews from "./api/review.routes.js";
import authRoutes from "./api/auth.routes.js";

const router = Router();

router.use('/auth', authRoutes)
router.use('/users', apiUser);
router.use('/trips', apiTrips);
router.use('/modality', apiModality);
router.use('/reviews', apiReviews);

export default router;
