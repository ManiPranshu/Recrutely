import dotenv from "dotenv"
import {pool, connectedDb} from "./db/connect.db.js"
import app from "./app.js"


dotenv.config({
  path: './.env'
})

const PORT = process.env.PORT || 5000;

connectedDb().then(()=>{
  app.listen(PORT,'0.0.0.0', () => {
    console.log("app is listening on port: ",PORT);
  })
}).catch((err)=>{
  console.log("app is not listening. Err: ",err);
});

// app.post("/add-user", async (req, res) => {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ message: "Name and email are required." });
//   }

//   try {
//     const result = await pool.query(
//       "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
//       [name, email]
//     );
    
//     // console.log(result)

//     res.status(201).json({
//       message: "User added successfully",
//       user: result.rows[0],
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to insert user", error: err.message });
//   }
// });