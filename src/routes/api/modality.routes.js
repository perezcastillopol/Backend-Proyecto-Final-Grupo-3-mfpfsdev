import { Router } from 'express';
import {getAllModalities, getModalityById} from '../../controllers/modality.controller.js';
import { checkIdModality } from '../../middlewares/modality.middlewares.js';


const router = Router();

router.get('/', getAllModalities);
router.get('/:modalityId', checkIdModality, getModalityById);


export default router;
