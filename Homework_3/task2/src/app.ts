import { config } from './config/environment';
import server from './loaders/express';

server.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${config.port}`);
});
