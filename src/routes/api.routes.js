import { Router } from 'express';

import apiUser from "./api/user.routes.js";
import apiTrips from "./api/trip.routes.js";
import apiModality from "./api/modality.routes.js";
import tripInvitationRoutes from "./routes/trip-invitation.routes.js";

const router = Router();

router.use('/users', apiUser);
router.use('/trips', apiTrips);
router.use('/modality', apiModality);
app.use('/api', tripInvitationRoutes);

export default router;
