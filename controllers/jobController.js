const pool = require('../config/db');

// Create Job
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      company_id
    } = req.body;

    const result = await pool.query(
      `INSERT INTO jobs
      (title, description, salary, company_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [title, description, salary, company_id]
    );

    res.status(201).json({
      message: 'Job Created',
      job: result.rows[0]
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// Get All Jobs
const getJobs = async (req, res) => {
  try {
    const {
      title,
      company,
      sort,
      page = 1,
      limit = 5
    } = req.query;

    let query = `
      SELECT
        jobs.*,
        companies.name AS company_name
      FROM jobs
      JOIN companies
      ON jobs.company_id = companies.id
    `;

    const values = [];
    const conditions = [];

    if (title) {
      values.push(`%${title}%`);
      conditions.push(
        `LOWER(jobs.title) LIKE LOWER($${values.length})`
      );
    }

    if (company) {
      values.push(company);
      conditions.push(
        `jobs.company_id = $${values.length}`
      );
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }

    if (sort === 'salary') {
      query += ` ORDER BY jobs.salary DESC`;
    } else {
      query += ` ORDER BY jobs.id`;
    }

    const offset = (page - 1) * limit;

    values.push(limit);
    values.push(offset);

    query += `
      LIMIT $${values.length - 1}
      OFFSET $${values.length}
    `;

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// Get Single Job
const getJob = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        jobs.*,
        companies.name AS company_name
      FROM jobs
      JOIN companies
      ON jobs.company_id = companies.id
      WHERE jobs.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Job Not Found'
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      salary,
      company_id
    } = req.body;

    const result = await pool.query(
      `UPDATE jobs
       SET title = $1,
           description = $2,
           salary = $3,
           company_id = $4
       WHERE id = $5
       RETURNING *`,
      [
        title,
        description,
        salary,
        company_id,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Job Not Found'
      });
    }

    res.json({
      message: 'Job Updated',
      job: result.rows[0]
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM jobs WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Job Not Found'
      });
    }

    res.json({
      message: 'Job Deleted'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
};