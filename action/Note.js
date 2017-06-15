import { debounce } from 'lodash/fp'
import fetch from 'axios'
import Note from '../models/Note'

export const INIT_NOTE_STATE = 'INIT_NOTE_STATE'
export const SELECT_NOTE = 'SELECT_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const ADD_NEW_NOTE = 'ADD_NEW_NOTE'

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

const saveNote = async (note) => {
  return await fetch.post('http://localhost:3000/note', {
    id: note.id,
    title: note.title,
    content: JSON.stringify(note.content),
    noteBookId: note.selectedNoteBookId
  })
}

export const debounceSaveNote = debounce(10000, saveNote)
