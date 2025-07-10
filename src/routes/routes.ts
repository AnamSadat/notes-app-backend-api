/**
 * @file routes.ts
 * @description Defines the API routes for the Notes App, connecting each endpoint to its respective handler.
 */

import { addNoteHandler, deleteNoteByIdHandle, editNoteByIdHandler, getAllNotesHandler, getNoteByIdHandler, index } from '../handler/handler';
import { ServerRoute } from '@hapi/hapi';

/**
 * List of all server routes for the Notes API.
 * Each route connects an HTTP method and path to its corresponding handler function.
 */
export const routes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    handler: index
  },
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
  },

];
