import express from 'express';

import RestaurantController from '../controllers/Restaurant.js';

const router = express.Router();

router.get('/profile/:id', RestaurantController.findById);

router.put('/profile/:id', RestaurantController.update);

router.get('/', RestaurantController.findAll);

export default router;