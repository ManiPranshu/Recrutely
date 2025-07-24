import { pool } from '../db/connect.db.js';

// Create a new job
export const createJob = async (jobData) => {
  const {
    title,
    company,
    workMode,
    jobType,
    salaryMin,
    salaryMax,
    location,
    responsibilities,
    skills,
    perks
  } = jobData;

  const result = await pool.query(
    `INSERT INTO jobs 
      (title, company, work_mode, job_type, salary_min, salary_max, location, responsibilities, skills, perks)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [
      title,
      company,
      workMode,
      jobType,
      salaryMin,
      salaryMax,
      location,
      responsibilities,
      skills,
      perks
    ]
  );

  return result.rows[0];
};

// Fetch all jobs
export const getAllJobs = async () => {
  const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
  return result.rows;
};

// Delete a job by ID
export const deleteJobById = async (id) => {
  const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);
  return result.rows[0]; // returns deleted job or undefined if not found
};

