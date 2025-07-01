import {nanoid} from 'nanoid'
import { notes } from './notes'
import { Notes } from './types'
import { Lifecycle } from '@hapi/hapi'

type NotePayload = {    
  title: string,
  tags: string[],
  body: string
}

export const addNoteHandler: Lifecycle.Method = (request, h) => {
  const {title, tags, body } = request.payload as NotePayload

  const id: string = nanoid(16)
  const createAt: string = new Date().toISOString();
  const updateAt: string = createAt

  const newNote: Notes = {
    title, tags, body, id, createAt, updateAt,
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

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',

  })
  response.code(500)
  return response
}
