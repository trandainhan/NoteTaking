import fetch from '../api/Fetch'
import NoteBook from '../models/NoteBook'
import { removeNotes } from './Note'

export const INIT_NOTE_BOOK_STATE = 'INIT_NOTE_BOOK_STATE'
export const ADD_NEW_NOTE_BOOK = 'ADD_NEW_NOTE_BOOK'
export const SELECT_NOTE_BOOK = 'SELECT_NOTE_BOOK'
export const REMOVE_NOTE_BOOK = 'REMOVE_NOTE_BOOK'
export const REMOVE_NOTE_FROM_NOTE_BOOK = 'REMOVE_NOTE_FROM_NOTE_BOOK'
export const UPDATE_NOTE_BOOK = 'UPDATE_NOTE_BOOK'

export const initNoteBooksState = (data) => ({
  type: INIT_NOTE_BOOK_STATE,
  data
})

export const addNewNoteBook = (noteBookId, noteBook) => ({
  type: ADD_NEW_NOTE_BOOK,
  noteBookId,
  noteBook
})

export const selectNoteBook = (noteBookId) => ({
  type: SELECT_NOTE_BOOK,
  noteBookId
})

export const removeNoteBook = (noteBook) => ({
  type: REMOVE_NOTE_BOOK,
  noteBook
})

export const removeNoteFromNoteBook = (noteBookId, noteId) => ({
  type: REMOVE_NOTE_FROM_NOTE_BOOK,
  noteBookId,
  noteId
})

export const updateNoteBook = (noteBookId, updatedNoteBook) => ({
  type: UPDATE_NOTE_BOOK,
  noteBookId,
  updatedNoteBook
})

export const saveNoteBook = async (noteBook) => {
  return await fetch.post('/notebook', noteBook)
}

// Async action

export const fetchNoteBooks = () => async (dispatch) => {
  const res = await fetch.get('/notebook')
  const data = res.data.map((noteBook) => {
    return new NoteBook({
      id: noteBook._id,
      title: noteBook.title,
      notes: noteBook.notes
    })
  })
  dispatch(initNoteBooksState(data))
}

export const deleteNoteBook = (noteBook) => async (dispatch) => {
  const res = await fetch.delete('/notebook', { params: { id: noteBook.id } })
  if (res.status === 202) {
    dispatch(removeNoteBook(noteBook))
    dispatch(removeNotes(noteBook.notes))
  }
}
