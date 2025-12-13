import { Router } from 'express';
import {getAllMessageByTrip, createMessage} from '../../controllers/message.controller.js';


const router = Router();

router.get('/:tripId', getAllMessageByTrip);

router.post('/', createMessage)


export default router;
