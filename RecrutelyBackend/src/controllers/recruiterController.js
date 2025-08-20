// // controllers/recruiterController.js
import {pool} from '../db/connect.db.js';

// export const createRecruiter = async (req, res) => {
//   try {
//     const {
//       id,
//       user_id,
//       recruiter_name,
//       recruiter_email,
//       company_name,
//       company_url,
//       industry_type,
//       company_size,
//       recruiter_designation,
//       recruiter_skills,
//       company_logo,
//       company_description,
//       phone_number
//     } = req.body;

//     const query = `
//       INSERT INTO recruiters (
//         id, user_id, recruiter_name, recruiter_email, company_name, 
//         company_url, industry_type, company_size, recruiter_designation, 
//         recruiter_skills, company_logo, company_description, phone_number
//       ) VALUES (
//         $1, $2, $3, $4, $5,
//         $6, $7, $8, $9,
//         $10, $11, $12, $13
//       )
//       RETURNING *
//     `;

//     const values = [
//       id, user_id, recruiter_name, recruiter_email, company_name,
//       company_url, industry_type, company_size, recruiter_designation,
//       recruiter_skills, company_logo, company_description, phone_number
//     ];

//     const result = await pool.query(query, values);
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('Error creating recruiter:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const createRecruiter = async (req, res) => {
  try {
    const {
      user_id,
      recruiter_name,
      recruiter_email,
      phone_number,
      company_name,
      company_url,
      industry_type,
      company_size,
      recruiter_designation,
      recruiter_skills,
      company_logo,
      company_description,
    } = req.body;

    if (!user_id || !recruiter_name || !recruiter_email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Assuming you're using a DB client like pg
    const result = await pool.query(
      `INSERT INTO recruiters (
        user_id, recruiter_name, recruiter_email, phone_number, company_name, 
        company_url, industry_type, company_size, recruiter_designation, 
        recruiter_skills, company_logo, company_description
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *`,
      [
        user_id,
        recruiter_name,
        recruiter_email,
        phone_number,
        company_name,
        company_url,
        industry_type,
        company_size,
        recruiter_designation,
        recruiter_skills,
        company_logo,
        company_description,
      ]
    );

    res.status(201).json({ message: "Profile created", data: result.rows[0] });
  } catch (err) {
    console.error("Error creating recruiter profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
