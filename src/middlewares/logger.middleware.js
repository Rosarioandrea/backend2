import logger from '../utils/logger.js';

const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

export default addLogger;
