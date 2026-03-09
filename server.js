const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Tripty Confectionary API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
