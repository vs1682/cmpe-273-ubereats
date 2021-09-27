import express from 'express';
import DishController from '../controllers/Dish.js';

const router = express.Router();

router.get('/categories', DishController.getCategories);

router.get('/types', DishController.getTypes);

router.post('/create', DishController.create);

router.get('/:restId/:id', DishController.find);

router.get('/:restId', DishController.findAll);

export default router;

