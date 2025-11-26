import { Router } from 'express';
import {getAllTrips, getTripById, createTrip, removeTrip, updateTrip} from '../../controllers/trip.controller.js';
import { checkId } from '../../middlewares/trips.middlewares.js';


const router = Router();

router.get('/', getAllTrips);
router.get('/:tripId', checkId, getTripById);

router.post('/', createTrip);

router.put('/:tripId', checkId, updateTrip )

router.delete('/:tripId', checkId, removeTrip);

export default router;
