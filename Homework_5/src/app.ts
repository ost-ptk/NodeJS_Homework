import { config } from './config/environment';
import server from './loaders/express';
import { genericErrorLogger, genericLogger } from './api';

server.listen(config.port, () => {
  genericLogger.info(`App listening on port ${config.port}`);
});

process.on('uncaughtException', (error) => {
  genericErrorLogger.error(`uncaughtException - ${error.message}`);
});
