require('./src/config/env');  
const app = require('./src/app');

const { logger } = require('./src/utils/logger');

const PORT  = process.env.PORT || 3000;
// Start the server only
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
  