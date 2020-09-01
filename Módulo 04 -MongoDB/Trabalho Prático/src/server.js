import winston from 'winston';

import app from './app.js'

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(
  ({ level, message, label: labelPrintf, timestamp: timestampPrintf }) => {
    return `${timestampPrintf} [${labelPrintf}] ${level}: ${message}`;
  },
);

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank.log' }),
  ],
  format: combine(label({ label: 'my-bank' }), timestamp(), myFormat),
});

app.listen(3000, async () => {
  try {
    console.log(`🚀 Server running on port 3000!`);
    global.logger.info('🚀 Server running on port 3000!');
  } catch (error) {
    global.logger.error(err);
  }
});
