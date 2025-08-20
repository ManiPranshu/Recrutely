
import{ pool }from "../db/connect.db.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT id, full_name, email, role, first_name, last_name, phone, location FROM users WHERE id = $1',
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch skills
    const skillsResult = await pool.query(
      'SELECT skill_name FROM user_skills WHERE user_id = $1',
      [userId]
    );
    const skills = skillsResult.rows.map(row => row.skill_name);

    // Fetch experience
    const experienceResult = await pool.query(
      'SELECT role, company, start_date, end_date, description FROM user_experience WHERE user_id = $1',
      [userId]
    );

    // Fetch education
    const educationResult = await pool.query(
      'SELECT degree, institution, start_date, end_date, description FROM user_education WHERE user_id = $1',
      [userId]
    );

    // Fetch documents
    const docResult = await pool.query(
      'SELECT profile_photo_url, resume_url FROM user_documents WHERE user_id = $1',
      [userId]
    );
    const documents = docResult.rows[0] || {};

    res.json({
      ...result.rows[0],
      skills,
      experience: experienceResult.rows,
      education: educationResult.rows,
      profile_photo_url: documents.profile_photo_url || null,
      resume_url: documents.resume_url || null,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};