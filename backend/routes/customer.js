import express from 'express';
import CustomerController from '../controllers/Customer.js';

const router = express.Router();

router.post('/profile/update', CustomerController.create);

export default router;

