import { Router } from 'express';
import {getAllTrips, getTripById, createTrip, removeTrip, updateTrip, getTripsByUserCreator, getTripsByModality, getFiltredTrips} from '../../controllers/trip.controller.js';
import { checkId } from '../../middlewares/trips.middlewares.js';
import { checkIdUser } from '../../middlewares/users.middlewares.js';
import { checkIdModality } from '../../middlewares/modality.middlewares.js';
import {authenticate} from "../../middlewares/auth.middlewares.js";


const router = Router();

router.get('/', getAllTrips);
router.get('/user/:userId',checkIdUser, getTripsByUserCreator);
router.get('/modality/:modalityId',checkIdModality, getTripsByModality);
router.get('/filter', getFiltredTrips)
router.get('/:tripId', checkId, getTripById);

router.use(authenticate)


router.post('/', createTrip);

router.put('/:tripId', checkId, updateTrip);

router.delete('/:tripId', checkId, removeTrip);

export default router;
