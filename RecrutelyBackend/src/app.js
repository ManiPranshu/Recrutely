// import express from "express"
// import cors from "cors"

// const app = express();

// // explain credentials --> 
// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true
// }))

// // read about this 
// app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))

// export default app;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import session from "express-session";
import passport from "passport";
import "./passport.js";
import jwt from "jsonwebtoken";

import profileRoutes from "./routes/profile.js";
import uploadRoutes from "./routes/upload.js";
import userRoutes from "./routes/user.js";
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import recruiterRoutes from './routes/recruiterRoutes.js';
import applicantRoutes from "./routes/applicantRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/user", userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use("/api/applicants", applicantRoutes);

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google Auth Routes
app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    // After success, redirect back to frontend
     res.redirect("http://localhost:5173/login");
  }
);

// GET /api/user-resumes/:userId
// app.get("/api/user-resumes/:userId", async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const result = await pool.query(
//       "SELECT id, resume_url, uploaded_at FROM user_resumes WHERE user_id = $1 ORDER BY uploaded_at DESC",
//       [userId]
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching resumes:", error);
//     res.status(500).json({ message: "❌ Could not fetch resumes" });
//   }
// });



export default app;
