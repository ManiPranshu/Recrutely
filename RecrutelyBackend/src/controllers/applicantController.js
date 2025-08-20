// controllers/applicantController.js
import {pool} from "../db/connect.db.js";

export const getAllApplicants = async (req, res) => {
    const { jobId } = req.params;

  try {
    const result = await pool.query(`
      SELECT
        a.id,
        a.job_id,
        a.status,
        a.resume_url,

        u.full_name AS user_name,
        u.email,

        ARRAY_AGG(DISTINCT us.skill_name) AS skills,

        MIN(ue.start_date) AS experience_start,
        MAX(ue.end_date) AS experience_end

      FROM applications a

      JOIN users u ON u.id = a.user_id
      LEFT JOIN user_skills us ON us.user_id = a.user_id
      LEFT JOIN user_experience ue ON ue.user_id = a.user_id
      WHERE a.job_id = $1
      GROUP BY a.id, a.job_id, a.status, a.resume_url, u.full_name, u.email
      ORDER BY a.id DESC`,[jobId]
);

    res.status(200).json({
      success: true,
      applicants: result.rows,
    });
  } catch (error) {
    console.error("Error fetching applicants:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applicants",
    });
  }
};
