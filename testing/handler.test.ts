import {
  addNoteHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandle,
} from '../src/handler/handler'
import { notes } from '../src/data/notes'
import { ResponseToolkit, Request } from '@hapi/hapi'

type MockRequest = {
  payload?: {
    title: string,
    tags: string[],
    body: string
  }
  params?: {
    id: string
  }
}

type ResponseData = {
  status: string,
  message?: string,
  data?: Record<string, unknown>
}

type MockResponseObject = {
  code: (statusCode: number) => ResponseData & { statusCode: number }
}

type MockResponseToolkit = {
  response: (data: ResponseData) => MockResponseObject
}

describe('Note Handlers', () => {
  beforeEach(() => {
    notes.length = 0 // reset notes before each test
  })

  it('adds a note successfully', () => {
    const mockRequest: MockRequest = {
      payload: {
        title: 'Test Note',
        tags: ['test'],
        body: 'Note body'
      }
    }

    const mockH = {
      response(data: ResponseData) {
        return {
          code(statusCode: number) {
            return { ...data, statusCode };
          }
        };
      }
    } as unknown as ResponseToolkit;

    // TODO: fix error next commit
    const result = addNoteHandler(mockRequest as Request, mockH as ResponseToolkit) as ResponseData & { statusCode: number }


    expect(result.status).toBe('success')
    expect(result.data.notesId).toBeDefined()
    expect(result.statusCode).toBe(201)
    expect(notes.length).toBe(1)
  })

  it('gets a note by ID', () => {
    const note = {
      id: 'abc123',
      title: 'Get Test',
      tags: ['get'],
      body: 'Some body',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    notes.push(note)

    const mockRequest: MockRequest = {
      params: { id: 'abc123' }
    }

    const mockH: MockResponseToolkit = {
      response: (data: ResponseData) => ({
        code: (statusCode: number) => ({ ...data, statusCode })
      })
    }

    const result = getNoteByIdHandler(mockRequest, mockH)

    expect(result.status).toBe('success')
    expect(result.data.note.title).toBe('Get Test')
  })

  it('edits a note by ID', () => {
    const id = 'edit-id'
    notes.push({
      id,
      title: 'Old Title',
      tags: ['old'],
      body: 'Old Body',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    const mockRequest: MockRequest = {
      params: { id },
      payload: {
        title: 'New Title',
        tags: ['new'],
        body: 'New Body'
      }
    }

    const mockH: MockResponseToolkit = {
      response: (data: ResponseData) => ({
        code: (statusCode: number) => ({ ...data, statusCode })
      })
    }

    const result = editNoteByIdHandler(mockRequest, mockH)

    expect(result.status).toBe('success')
    expect(result.message).toContain('berhasil diperbarui')
    expect(result.statusCode).toBe(200)
    expect(notes[0].title).toBe('New Title')
  })

  it('deletes a note by ID', () => {
    const id = 'delete-id'
    notes.push({
      id,
      title: 'To Delete',
      tags: [],
      body: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    const mockRequest: MockRequest = {
      params: { id }
    }

    const mockH: MockResponseToolkit = {
      response: (data: ResponseData) => ({
        code: (statusCode: number) => ({ ...data, statusCode })
      })
    }

    const result = deleteNoteByIdHandle(mockRequest, mockH)

    expect(result.status).toBe('success')
    expect(result.message).toContain('berhasil dihapus')
    expect(result.statusCode).toBe(200)
    expect(notes.length).toBe(0)
  })
})
