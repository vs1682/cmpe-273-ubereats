import express from 'express';

import UploadController from '../controllers/Upload.js';

const router = express.Router();

router.get('/', UploadController.toS3);

export default router;

