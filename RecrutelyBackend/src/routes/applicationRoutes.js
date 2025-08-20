import express from "express";
import {submitApplication,getApplicantsByJobId,getApplicationsByUserId}  from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", submitApplication);
router.get("/job/:jobId", getApplicantsByJobId);
router.get('/:userId', getApplicationsByUserId);


 export default router;