import { nanoid } from 'nanoid'
import { notes } from './notes'
import type { NoteType } from './types'
import { Lifecycle } from '@hapi/hapi'

type NotePayload = {    
  title: string,
  tags: string[],
  body: string
}

type NoteParams = {
  id: string
}

export const addNoteHandler: Lifecycle.Method = (request, h) => {
  const {title, tags, body } = request.payload as NotePayload

  const id: string = nanoid(16)
  const createdAt: string = new Date().toISOString();
  const updatedAt: string = createdAt

  const newNote: NoteType = {
    title, tags, body, id, createdAt, updatedAt,
  }

  notes.push(newNote)

  const isSuccess: boolean = notes.filter((note) => note.id === id).length > 0

  if(isSuccess){
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        notesId: id,
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

export const getAllNotesHandler: Lifecycle.Method = () => ({
  status: 'success',
  data: {
    notes,
  },
  
})

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

  console.log(note)

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  })
  response.code(404)
  return response
}

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