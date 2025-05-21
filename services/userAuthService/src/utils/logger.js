// Importing required libraries
const winston = require('winston');   // For logging messages (to files and console)
const fs = require('fs');             // To interact with the file system
const path = require('path');         // To handle file paths safely across platforms

// Directory where logs will be stored
const logDir = 'src/logs';

// Check if the logs directory exists, if not, create it
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir); // Create 'src/logs' directory
}

// Create a winston logger instance with various settings
const logger = winston.createLogger({
  level: 'info',                        // The minimum level of logging to record (logs info, warn, and error messages)
  format: winston.format.json(),        // Log messages will be in JSON format
  transports: [
    // Logs 'error' level messages and higher to 'error.log' file
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),

    // Logs 'info' level messages and higher to 'combined.log' file
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
  ]
});

// If the environment is not 'production', log messages to the console too
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));  // Simple format for console logs
}

// Creating a custom stream for morgan (used for HTTP request logging) to log to winston
const morganStream = {
  write: (message) => logger.info(message.trim()) // Stream the HTTP logs as 'info' level logs
};

// Exporting the logger and morgan stream for use in other files
module.exports = { logger, morganStream };
