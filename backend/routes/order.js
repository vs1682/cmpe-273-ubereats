import express from 'express';
import OrderController from '../controllers/Order.js';

const router = express.Router();

router.post('/create', OrderController.create);

router.get('/:id', OrderController.findById);

router.get('/customer/:id', OrderController.findAllByCustomer);

router.get('/restaurant/:id', OrderController.findAllByRestaurant);

export default router;