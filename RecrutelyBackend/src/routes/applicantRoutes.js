// routes/applicantRoutes.js
import express from "express";
import { getAllApplicants } from "../controllers/applicantController.js";

const router = express.Router();

router.get("/:jobId", getAllApplicants);

export default router;
