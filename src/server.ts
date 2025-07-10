/**
 * @file server.ts
 * @description Initializes and starts the Hapi.js server, sets up routing and CORS.
 */

import Hapi from '@hapi/hapi';
import { routes } from './routes/routes.ts';

/**
 * Initializes and starts the Hapi server.
 *
 * - Sets server configuration (host, port, CORS)
 * - Registers routes from the routes folder
 * - Starts the server and logs the running URL
 *
 * @returns A promise that resolves when the server has started.
 */
const init = async (): Promise<void> => {
  const server: Hapi.Server = Hapi.server({
    port: 8080,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], //Allow all origins (CORS)
      },
    },
  });

  server.route(routes)
  await server.start();

  console.log(`Server berhasil dijalankan di ${server.info.uri}`);

};

init();
