import { Router } from 'express';
import {getTripParticipants, isParticipant} from '../../controllers/participants.controller.js';
import { checkId } from '../../middlewares/trips.middlewares.js';

const router = Router();

router.get('/trip/:tripId/', checkId, getTripParticipants);
router.get('/:tripId/:userId', isParticipant);


export default router;
