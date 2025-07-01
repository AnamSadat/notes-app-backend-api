import { addNoteHandler, deleteNoteByIdHandle, editNoteByIdHandler, getAllNotesHandler, getNoteByIdHandler } from '../handler/handler';
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
    path: '/notes/{id}',
    handler: editNoteByIdHandler
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandle
  }
];
