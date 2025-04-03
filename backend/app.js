require('dotenv').config(); // ✅ Must be FIRST line
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes'); // ✅ NEW
const setupSwagger = require('./config/swagger');
const cors = require('cors');

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/user', userRoutes);
app.use('/', jobRoutes); // ✅ Register job routes globally

// Swagger
setupSwagger(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
