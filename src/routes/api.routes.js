import { Router } from 'express';

import apiUser from "./api/user.routes.js";
const router = Router();

router.use('/users', apiUser);

export default router;
