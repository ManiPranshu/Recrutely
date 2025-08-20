// routes/recruiterRoutes.js
import express from 'express';
import { createRecruiter } from '../controllers/recruiterController.js';

const router = express.Router();

router.post('/profile', createRecruiter);

export default router;
