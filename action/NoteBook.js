import fetch from 'axios'
import NoteBook from '../models/NoteBook'

export const INIT_NOTE_BOOK_STATE = 'INIT_NOTE_BOOK_STATE'
export const ADD_NEW_NOTE_BOOK = 'ADD_NEW_NOTE_BOOK'
export const SELECT_NOTE_BOOK = 'SELECT_NOTE_BOOK'

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


export const fetchNoteBooks = () => async (dispatch) => {
  const res = await fetch.get('http://localhost:3000/notebook')
  const data = res.data.map((noteBook) => {
    return new NoteBook({
      id: noteBook._id,
      title: noteBook.title,
      notes: noteBook.notes
    })
  })
  dispatch(initNoteBooksState(data))
}
