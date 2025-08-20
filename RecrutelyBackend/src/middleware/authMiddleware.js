// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId: ... }
    console.log("Decoded user:", decoded); // ✅ This should show user id

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};


export const verifyRecruiter = (req, res, next) => {
  if (!req.user || req.user.role !== 'recruiter') {
    return res.status(403).json({ message: "Access denied. Recruiters only." });
  }
  next();
};