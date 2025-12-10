import { Router } from 'express';

import apiUser from "./api/user.routes.js";
import apiTrips from "./api/trip.routes.js";
import apiModality from "./api/modality.routes.js";
import apiReviews from "./api/review.routes.js";
import authRoutes from "./api/auth.routes.js";
import {authenticate} from "../middlewares/auth.middlewares.js";
import tripInvitationRoutes from "./api/trip-invitation.routes.js";

const router = Router();

router.use('/auth', authRoutes)
router.use('/trips', apiTrips);

router.use(authenticate)

router.use('/users', apiUser);
router.use('/modality', apiModality);
router.use('/reviews', apiReviews);
router.use('/', tripInvitationRoutes);

export default router;
