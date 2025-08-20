
// upload.js
import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary.js";

const router = express.Router();

// ✅ For photo upload (images only)
const photoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_uploads/photos",
    resource_type: "image",
    
    public_id: (req, file) => {
  const originalName = file.originalname.replace(/\.[^/.]+$/, ""); // remove extension
  const safeName = originalName.replace(/\s+/g, "_").replace(/[^\w\-]/g, ""); // sanitize
  return `${safeName}_${new Date(Date.now())}`;
}
  }
});

// ✅ For resume upload (PDF/DOC/DOCX)
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    
    folder: "user_uploads/resumes",
    resource_type: "auto", 
    public_id: (req, file) => {
  const originalName = file.originalname.replace(/\.[^/.]+$/, ""); // remove extension
  const safeName = originalName.replace(/\s+/g, "_").replace(/[^\w\-]/g, ""); // sanitize
  return `${safeName}_${new Date(Date.now())}`;
}
  }
});

const uploadPhoto = multer({ storage: photoStorage });
const uploadResume = multer({ storage: resumeStorage });

// Photo Upload Endpoint
router.post("/photo", uploadPhoto.single("file"),
(req, res) => {
  console.log("📸 Uploaded Photo:", req.file);
  res.json({ url: req.file.path });
}
);

// Resume Upload Endpoint
router.post("/resume", uploadResume.single("file"), 
(req, res) => {
  console.log("📄 Uploaded Resume:", req.file);
  res.json({ url: req.file.path });
});

export default router;
