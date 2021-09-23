import express from 'express';
import CredsController from '../controllers/Creds.js';

const router = express.Router();

router.post('/sign-up', CredsController.create);

router.post('/sign-in', CredsController.signIn);

export default router;