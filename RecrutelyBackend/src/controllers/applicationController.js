import {pool} from "../db/connect.db.js";

export const submitApplication = async (req, res) => {
  const { userId, jobId, resumeUrl, personalMessage } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO applications (user_id, job_id, resume_url, personal_message)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, jobId, resumeUrl, personalMessage]
    );

    res.status(201).json({ message: "✅ Application submitted", application: result.rows[0] });
  } catch (err) {
    console.error("Error submitting application", err);
    res.status(500).json({ message: "❌ Failed to apply" });
  }
};


export const getApplicantsByJobId = async (req, res) => {
  const { jobId } = req.params;

  try {
    const query = `
      SELECT 
        u.id,
        u.full_name,
        u.email,
        ARRAY_AGG(DISTINCT us.skill) AS skills,
        JSON_AGG(
          DISTINCT JSONB_BUILD_OBJECT(
            'role', ue.role,
            'company', ue.company,
            'start_date', ue.start_date,
            'end_date', ue.end_date,
            'description', ue.description
          )
        ) FILTER (WHERE ue.id IS NOT NULL) AS experiences,
        a.status,
        a.resume_url
      FROM applications a
      JOIN users u ON a.user_id = u.id
      LEFT JOIN user_skills us ON us.user_id = u.id
      LEFT JOIN user_experience ue ON ue.user_id = u.id
      WHERE a.job_id = $1
      GROUP BY u.id, a.status, a.resume_url
    `;

    const result = await pool.query(query, [jobId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
};

export const getApplicationsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const query = `
      SELECT
  a.resume_url,
  a.applied_at,
  a.status,
  j.title AS job_title,
  r.company_name AS company
FROM applications a
JOIN jobs j ON a.job_id = j.id
JOIN recruiters r ON j.recruiter_id = r.id
WHERE a.user_id = $1
ORDER BY a.applied_at DESC;

    `;

    const { rows } = await pool.query(query, [userId]);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};