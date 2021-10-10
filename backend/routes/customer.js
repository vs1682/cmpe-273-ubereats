import express from 'express';
import CustomerController from '../controllers/Customer.js';

const router = express.Router();

router.put('/profile/:id', CustomerController.update);

router.get('/profile/:id', CustomerController.getProfile);

router.post('/favorite', CustomerController.favorite);

router.get('/:id/favorites', CustomerController.getFavorites);

router.get('/address', CustomerController.getAddress);

router.post('/address', CustomerController.addAddress);

router.get('/address/all', CustomerController.getAllAddresses);

export default router;

