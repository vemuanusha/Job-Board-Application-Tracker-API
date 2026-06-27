const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        message: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users(name, email, password)
      VALUES($1, $2, $3)
      RETURNING id, name, email, role
    `;

    const values = [name, email, hashedPassword];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'User Registered',
      user: result.rows[0]
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: 'Invalid Email'
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid Password'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    res.json({
      message: 'Login Successful',
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

module.exports = {
  register,
  login
};