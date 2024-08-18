const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');
const syncModels = require('./syncModels');

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    headers: true,
});


app.use(limiter)
app.use(express.json());
app.use('/api', bookRoutes);
app.use('/api', borrowerRoutes);
app.use('/api', borrowingRoutes);


const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await syncModels();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
