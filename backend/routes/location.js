import express from 'express';

import LocationController from '../controllers/Location.js';

const router = express.Router();

router.get('/details', LocationController.getDetails);

router.get('/:country', LocationController.getStates);

router.get('/:country/:state', LocationController.getCities);

router.get('/', LocationController.getCountries);

export default router;

