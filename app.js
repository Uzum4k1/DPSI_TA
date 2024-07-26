const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patient');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
