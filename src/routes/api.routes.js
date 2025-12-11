import {Router} from 'express';

import apiUser from "./api/user.routes.js";
import apiTrips from "./api/trip.routes.js";
import apiModality from "./api/modality.routes.js";
import apiReviews from "./api/review.routes.js";
import authRoutes from "./api/auth.routes.js";
import apiTripRequest from "./api/trip-requests.routes.js";

const router = Router();

router.use('/auth', authRoutes)
router.use('/trips', apiTrips);
router.use('/users', apiUser);
router.use('/modality', apiModality);
router.use('/reviews', apiReviews);
router.use('/trip-requests', apiTripRequest);

export default router;
