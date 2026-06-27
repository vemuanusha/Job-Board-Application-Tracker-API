const express = require('express');
const dotenv = require('dotenv');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

pool.connect()
  .then(() => console.log('PostgreSQL Connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});