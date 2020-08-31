import {app} from './app';
import {logger} from './util';
import {CosmosProvider} from './providers';

CosmosProvider.init()
  .then(() => {
    logger.info('DB_CONNECTED', 'success');
  })
  .catch(e => {
    logger.error('DB_FAILURE', e);
  });

const server = app.listen(app.get('port'), () => {
  logger.info(
    'APP_START',
    `App is running at http://localhost:${app.get('port')} in ${app.get(
      'env'
    )} mode`
  );
});

process.on('unhandledRejection', reason => {
  logger.error('UNHANDLED_REJECTION', reason);
});

process.on('uncaughtException', error => {
  logger.error('UNHANDLED_REJECTION', error);
});

export default server;
