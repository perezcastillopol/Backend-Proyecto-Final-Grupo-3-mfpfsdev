import { Router } from 'express';
import {getTripParticipants} from '../../controllers/participants.controller.js';
import { checkId } from '../../middlewares/trips.middlewares.js';

const router = Router();

router.get('/trip/:tripId/', checkId, getTripParticipants);


export default router;
