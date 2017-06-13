import NoteBook from '../models/NoteBook'
import Note from '../models/Note'
import fetch from 'axios'

export const INIT_NOTE_BOOK_STATE = 'INIT_NOTE_BOOK_STATE'
export const INIT_NOTE_STATE = 'INIT_NOTE_STATE'
export const SELECT_NOTE = 'SELECT_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const ADD_NEW_NOTE = 'ADD_NEW_NOTE'
export const ADD_NEW_NOTE_BOOK = 'ADD_NEW_NOTE_BOOK'
export const SELECT_NOTE_BOOK = 'SELECT_NOTE_BOOK'

export const initNoteBooksState = (data) => ({
  type: INIT_NOTE_BOOK_STATE,
  data
})

export const initNotesState = (data) => ({
  type: INIT_NOTE_STATE,
  data
})

export const selectNote = (noteId) => ({
  type: SELECT_NOTE,
  noteId
})

export const updateNote = (updatedNote, noteId) => ({
  type: UPDATE_NOTE,
  noteId,
  updatedNote
})

export const addNewNote = (noteId, note) => ({
  type: ADD_NEW_NOTE,
  noteId,
  note
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

export const fetchNotes = () => async (dispatch) => {
  const res = await fetch.get('http://localhost:3000/note')
  const data = res.data.map((note) => {
    return new Note({
      id: note._id,
      title: note.title,
      content: JSON.parse(note.content),
      noteBookId: note.noteBookId
    })
  })
  dispatch(initNotesState(data))
}
