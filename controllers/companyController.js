const pool = require('../config/db');

// Create Company
const createCompany = async (req, res) => {
  try {
    const { name, location, website } = req.body;

    const result = await pool.query(
      `INSERT INTO companies(name, location, website)
       VALUES($1, $2, $3)
       RETURNING *`,
      [name, location, website]
    );

    res.status(201).json({
      message: 'Company Created',
      company: result.rows[0]
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// Get All Companies
const getCompanies = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM companies ORDER BY id'
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// Get Single Company
const getCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM companies WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Company Not Found'
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

// Update Company
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, website } = req.body;

    const result = await pool.query(
      `UPDATE companies
       SET name=$1,
           location=$2,
           website=$3
       WHERE id=$4
       RETURNING *`,
      [name, location, website, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Company Not Found'
      });
    }

    res.json({
      message: 'Company Updated',
      company: result.rows[0]
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// Delete Company
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM companies WHERE id=$1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Company Not Found'
      });
    }

    res.json({
      message: 'Company Deleted'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany
};