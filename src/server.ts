/**
 * @filename server.ts
 */
import Hapi from '@hapi/hapi';
import { routes } from './routes';

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.start();
  server.route(routes)

  console.log(`Server berhasil dijalankan di ${server.info.uri}`);
  console.log('<h1>Welcome to Backend API</h1>');

};

init();
