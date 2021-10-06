import express from 'express';
import CustomerController from '../controllers/Customer.js';

const router = express.Router();

router.put('/profile/:id', CustomerController.update);

router.get('/profile/:id', CustomerController.getProfile);

export default router;

