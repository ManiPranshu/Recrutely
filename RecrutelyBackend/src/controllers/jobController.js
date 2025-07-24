// src/controllers/jobController.js
import { pool } from "../db/connect.db.js";
import { deleteJobById } from "../models/jobModel.js";
export const postJob = async (req, res) => {
  try {
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
      perks,
    } = req.body;

    const query = `
      INSERT INTO jobs
      (title, company, work_mode, job_type, salary_min, salary_max, location, responsibilities, skills, perks)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [
      title,
      company,
      workMode,
      jobType,
      salaryMin,
      salaryMax,
      location,
      responsibilities,
      skills,
      perks,
    ];

    const { rows } = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: rows[0],
    });
  } catch (error) {
    console.error("Error posting job:", error.message);
    res.status(500).json({
      success: false,
      message: "Error posting job",
      error: error.message,
    });
  }
};

export const fetchJobs = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM jobs ORDER BY posted_at DESC"
    );
    res.status(200).json({
      success: true,
      jobs: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};


export const getDashboardStats = async (req, res) => {
  try {
    const totalJobsResult = await pool.query(`SELECT COUNT(*) FROM jobs`);


    const totalJobs = parseInt(totalJobsResult.rows[0].count);


    res.status(200).json({
      success: true,
      stats: {
        totalJobs,
        // add more if needed
      },
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
    });
  }
};

export const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, job: result.rows[0] });
  } catch (error) {
    console.error("Error fetching job:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await deleteJobById(id);

    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, message: "Job deleted successfully", job: deletedJob });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ success: false, message: "Server error while deleting job" });
  }
};



export const updateJobById = async (req, res) => {
  const { id } = req.params;
  const {
   title,
  workMode,
  jobType,
  salaryMin,
  salaryMax,
  location,
  responsibilities,
  skills,
  perks
  } = req.body;

  try {
    const updated = await pool.query(
      `UPDATE jobs SET 
        title = $1,
        work_mode = $2,
        job_type = $3,
        salary_min = $4,
        salary_max = $5,
        location = $6,
        responsibilities = $7,
        skills = $8,
        perks = $9
      WHERE id = $10 RETURNING *`,
      [title, workMode, jobType, salaryMin, salaryMax, location, responsibilities, skills, perks, id]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update job" });
  }
};



