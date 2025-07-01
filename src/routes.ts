import { addNoteHandler, editNoteByIdHandler, getAllNotesHandler, getNoteByIdHandler } from './handler';
import { ServerRoute } from '@hapi/hapi';

export const routes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler
  },
  {
    method: 'PUT',
    path: '/note/{id}',
    handler: editNoteByIdHandler
  }
];
