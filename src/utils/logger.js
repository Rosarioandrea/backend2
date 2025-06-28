import winston from 'winston';

const customLevels = {
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
  },
  colors: {
    debug: 'blue',
    http: 'magenta',
    info: 'green',
    warning: 'yellow',
    error: 'red',
    fatal: 'bold red',
  }
};

winston.addColors(customLevels.colors);

const getLogger = () => {
  const env = process.env.NODE_ENV || 'development';
  return winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.Console({
        level: env === 'production' ? 'info' : 'debug',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
      new winston.transports.File({
        filename: 'errors.log',
        level: 'error'
      })
    ]
  });
};

export const logger = getLogger();
export default logger;