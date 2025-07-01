import { addNoteHandler } from './handler';
import { ServerRoute } from '@hapi/hapi';

export const routes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
];
