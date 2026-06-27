const pool = require('../config/db');

// Apply for Job
const applyJob = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { job_id } = req.body;

    const alreadyApplied = await pool.query(
      `SELECT * FROM applications
       WHERE user_id=$1 AND job_id=$2`,
      [user_id, job_id]
    );

    if (alreadyApplied.rows.length > 0) {
      return res.status(400).json({
        message: 'Already Applied'
      });
    }

    const result = await pool.query(
      `INSERT INTO applications
      (user_id, job_id)
      VALUES ($1,$2)
      RETURNING *`,
      [user_id, job_id]
    );

    res.status(201).json({
      message: 'Application Submitted',
      application: result.rows[0]
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// My Applications
const myApplications = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await pool.query(
      `
      SELECT
        applications.id,
        applications.status,
        applications.applied_at,
        jobs.title,
        companies.name AS company_name
      FROM applications
      JOIN jobs
      ON applications.job_id = jobs.id
      JOIN companies
      ON jobs.company_id = companies.id
      WHERE applications.user_id = $1
      `,
      [user_id]
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// Update Application Status
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `
      UPDATE applications
      SET status=$1
      WHERE id=$2
      RETURNING *
      `,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Application Not Found'
      });
    }

    res.json({
      message: 'Status Updated',
      application: result.rows[0]
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

module.exports = {
  applyJob,
  myApplications,
  updateStatus
};