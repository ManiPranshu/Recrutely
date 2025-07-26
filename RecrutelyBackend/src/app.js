import express from "express"
import cors from "cors"

const app = express();

// explain credentials --> 
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

// read about this 
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//routes import
import userRouter from "./routes/user.routes"


// routes declaration
app.use("/api/v1/users",userRouter);

export default app;