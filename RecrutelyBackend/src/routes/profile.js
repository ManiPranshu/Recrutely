import express from "express";
import { saveUserProfile,getResumesByUserId} from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/", saveUserProfile);
router.get('/resumes/:userId', getResumesByUserId);

export default router;