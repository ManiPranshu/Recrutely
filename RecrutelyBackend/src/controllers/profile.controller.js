
import {pool} from "../db/connect.db.js";

export const saveUserProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    location,
    skills,
    experience,
    education,
    profilePhotoUrl,
    resumeUrl,
  } = req.body;

  try {
    // 1. Check if user exists
    const userCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    let userId = userCheck.rows[0].id;

    // 2. Update user profile info
    const userResult = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, phone = $3, location = $4 WHERE email = $5 RETURNING id",
      [firstName, lastName, phone, location, email]
    );
    userId = userResult.rows[0].id;

    // 3. Remove old skills, experience, education
    await pool.query("DELETE FROM user_skills WHERE user_id = $1", [userId]);
    await pool.query("DELETE FROM user_experience WHERE user_id = $1", [userId]);
    await pool.query("DELETE FROM user_education WHERE user_id = $1", [userId]);

    // 4. Insert new skills
    for (const skill of skills) {
      await pool.query(
        "INSERT INTO user_skills (user_id, skill_name) VALUES ($1, $2)",
        [userId, skill]
      );
    }

    // 5. Insert new experience
    for (const exp of experience) {
      await pool.query(
        `INSERT INTO user_experience (user_id, role, company, start_date, end_date, description)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [userId, exp.role, exp.company, exp.start_date||null, exp.end_date||null, exp.description]
      );
    }

    // 6. Insert new education
    for (const edu of education) {
      await pool.query(
        `INSERT INTO user_education (user_id, degree, institution, start_date, end_date, description)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [userId, edu.degree, edu.institution, edu.start_date||null, edu.end_date||null, edu.description]
      );
    }

    // 7. Insert/Update documents
    const existingDoc = await pool.query("SELECT id FROM user_documents WHERE user_id = $1", [userId]);
    if (existingDoc.rows.length > 0) {
      await pool.query(
        "UPDATE user_documents SET profile_photo_url = $1, resume_url = $2 WHERE user_id = $3",
        [profilePhotoUrl, resumeUrl, userId]
      );
    } else {
      await pool.query(
        "INSERT INTO user_documents (user_id, profile_photo_url, resume_url) VALUES ($1, $2, $3)",
        [userId, profilePhotoUrl, resumeUrl]
      );
    }

    // 🔽 NEW CODE: Also insert resume into `user_resumes` table
if (resumeUrl) {
  await pool.query(
    "INSERT INTO user_resumes (user_id, resume_url) VALUES ($1, $2)",
    [userId, resumeUrl]
  );
}

    res.status(200).json({ message: "✅ Profile saved successfully" });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
};

export const getResumesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, resume_url, uploaded_at, user_id FROM user_resumes WHERE user_id = $1 ORDER BY uploaded_at DESC',
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: '❌ Failed to fetch resumes' });
  }
};
