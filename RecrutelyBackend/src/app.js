import express from "express"
import cors from "cors"
import jobRoutes from './routes/jobRoutes.js';

const app = express();

// explain credentials --> 
app.use(cors({
  // origin: process.env.CORS_ORIGIN,
  // credentials: true
}))

app.use(express.json());
app.use('/api/jobs', jobRoutes);

// read about this 
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

export default app;