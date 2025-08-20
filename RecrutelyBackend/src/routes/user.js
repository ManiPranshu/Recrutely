// routes/userRoutes.js
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getUserProfile } from '../controllers/userController.js';


const router = express.Router();

router.get('/', verifyToken, getUserProfile);



export default router;
