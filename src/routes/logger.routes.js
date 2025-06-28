import { Router } from 'express';
import logger from '../utils/logger.js';

const router = Router();

router.get('/loggerTest', (req, res) => {
  logger.debug('Este es un mensaje DEBUG');
  logger.http('Este es un mensaje HTTP');
  logger.info('Este es un mensaje INFO');
  logger.warning('Este es un mensaje WARNING');
  logger.error('Este es un mensaje ERROR');
  logger.fatal('Este es un mensaje FATAL');
  res.send('Logs generados. Revisá consola y errors.log');
});

export default router;
