require('dotenv').config();
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { logger } = require('./utils/logger');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info('Connected to MongoDB');
    const server = http.createServer(app);
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('MongoDB connection failed:', err);
  });
