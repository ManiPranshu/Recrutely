
import {pool} from "../db/connect.db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login Request Body:", req.body); // to see the credentials

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role, fullName: user.full_name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        role: user.role,
        fullName: user.full_name,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



// export const registerUser = async (req, res) => {
//   const { fullName, email, password, role, employerId } = req.body;

//   console.log("Register Request Body:", req.body); // to see the credentials

//   try {
//     const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await pool.query(
//       "INSERT INTO users (full_name, email, password, role, employer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//       [fullName, email, hashedPassword, role, role === "employer" ? employerId : null]
//     );

//     res.status(201).json({ message: "Registration successful", user: newUser.rows[0] });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const registerUser = async (req, res) => {
  const { fullName, email, password, role, employerId } = req.body;

  console.log("Register Request Body:", req.body);

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into users table WITHOUT employer_id
    const newUserResult = await pool.query(
      "INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [fullName, email, hashedPassword, role]
    );

    const newUser = newUserResult.rows[0];

    // If role is recruiter, insert into recruiters table
    if (role === "employer") {
      await pool.query(
        "INSERT INTO recruiters (recruiter_name,recruiter_email,user_id, employer_id) VALUES ($1, $2, $3, $4)",
        [newUser.full_name,newUser.email,newUser.id, employerId]
      );
    }

    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
