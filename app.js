const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const syncModels = require('./syncModels');

app.use(express.json());
app.use('/api', bookRoutes);
app.use('/api', borrowerRoutes);

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
