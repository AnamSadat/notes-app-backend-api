/**
 * @filename server.ts
 */
import Hapi from '@hapi/hapi';
import { routes } from './routes';

const init = async (): Promise<void> => {
  const server: Hapi.Server = Hapi.server({
    port: 8080,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes)
  await server.start();

  console.log(`Server berhasil dijalankan di ${server.info.uri}`);

};

init();
