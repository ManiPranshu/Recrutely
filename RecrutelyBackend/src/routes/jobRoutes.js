// routes/jobRoutes.js
import express from 'express';
import { postJob,fetchJobs,deleteJob,getDashboardStats,getJobById,updateJobById } from '../controllers/jobController.js';

const router = express.Router();
router.post('/post-job', postJob);
router.get('/listings', fetchJobs);
router.delete('/:id', deleteJob);
router.get('/dashboard-stats', getDashboardStats);
router.get('/:id', getJobById);
router.put("/:id", updateJobById);



export default router;
