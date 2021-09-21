import express from 'express';
import CredsController from '../controllers/Creds.js';

const router = express.Router();

router.post('/sign-up', CredsController.create);

export default router;