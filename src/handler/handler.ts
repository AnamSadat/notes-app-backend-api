/**
 * @file handler.ts
 * @description Contains route handlers for adding, retrieving, updating, and deleting notes.
 */

import { nanoid } from 'nanoid'
import { notes } from '../data/notes'
import type { NoteType } from '../type/types'
import { Lifecycle } from '@hapi/hapi'

type NotePayload = {
  title: string,
  tags: string[],
  body: string
}

type NoteParams = {
  id: string
}

/**
 * Index for beggin API
 *
 * @returns Hapi response for API connect
 */
export const index: Lifecycle.Method = (request, h) => {
  const response = h.response({
    status: 'oke',
    message: 'Welcome to Backend API Notes App'
  })

  response.code(200)
  return response
}

/**
 * Adds a new note to the notes array.
 *
 * @param request - Hapi request object, expects payload with title, tags, and body.
 * @param h - Hapi response toolkit.
 * @returns Hapi response indicating success or failure.
 */
export const addNoteHandler: Lifecycle.Method = (request, h) => {
  const { title, tags, body } = request.payload as NotePayload

  const id: string = nanoid(16)
  const createdAt: string = new Date().toISOString();
  const updatedAt: string = createdAt

  const newNote: NoteType = {
    title, tags, body, id, createdAt, updatedAt,
  }

  notes.push(newNote)

  const isSuccess: boolean = notes.filter((note) => note.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    })
    response.code(201)
    return response
  }

  console.log(notes)

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',

  })

  response.code(500)
  return response
}

/**
 * Retrieves all notes.
 *
 * @returns Hapi response containing all notes.
 */
export const getAllNotesHandler: Lifecycle.Method = () => ({
  status: 'success',
  data: {
    notes,
  },

})

/**
 * Retrieves a note by its ID.
 *
 * @param request - Hapi request object containing note ID in the params.
 * @param h - Hapi response toolkit.
 * @returns Hapi response with the found note or 404 error if not found.
 */
export const getNoteByIdHandler: Lifecycle.Method = (request, h) => {
  const { id } = request.params as NoteParams

  const note: NoteType | undefined = notes.filter((n) => n.id === id)[0]

  if (note !== undefined) {
    console.log(note)
    return {
      status: 'success',
      data: {
        note,
      },
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  })
  response.code(404)
  return response
}

/**
 * Updates an existing note by its ID.
 *
 * @param request - Hapi request object with updated title, tags, and body in payload.
 * @param h - Hapi response toolkit.
 * @returns Hapi response indicating success or 404 if the note is not found.
 */
export const editNoteByIdHandler: Lifecycle.Method = (request, h) => {
  const { id } = request.params as NoteParams;

  const { title, tags, body } = request.payload as NotePayload
  const updatedAt: string = new Date().toISOString();

  const index: number = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan'
  })

  response.code(404)
  return response
}

/**
 * Deletes a note by its ID.
 *
 * @param request - Hapi request object with note ID in params.
 * @param h - Hapi response toolkit.
 * @returns Hapi response indicating success or failure if the ID is not found.
 */
export const deleteNoteByIdHandle: Lifecycle.Method = (request, h) => {
  const { id } = request.params as NoteParams

  const index: number = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}
