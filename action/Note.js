import { debounce } from 'lodash/fp'
import fetch from '../api/Fetch'
import Note from '../models/Note'
import { removeNoteFromNoteBook } from './NoteBook'

export const INIT_NOTE_STATE = 'INIT_NOTE_STATE'
export const SELECT_NOTE = 'SELECT_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const ADD_NEW_NOTE = 'ADD_NEW_NOTE'
export const REMOVE_NOTES = 'REMOVE_NOTES'

export const initNotesState = (data) => ({
  type: INIT_NOTE_STATE,
  data
})

export const selectNote = (noteId) => ({
  type: SELECT_NOTE,
  noteId
})

export const updateNote = (updatedNote, noteId) => {
  debounceSaveNote(updatedNote)
  return {
    type: UPDATE_NOTE,
    noteId,
    updatedNote
  }
}

export const addNewNote = (noteId, note) => ({
  type: ADD_NEW_NOTE,
  noteId,
  note
})

export const removeNotes = (noteIds) => ({
  type: REMOVE_NOTES,
  noteIds
})

const saveNote = async (note) => {
  return await fetch.post('/note', {
    id: note.id,
    title: note.title,
    content: JSON.stringify(note.content),
    noteBookId: note.noteBookId
  })
}

const debounceSaveNote = debounce(5000, saveNote)


// Async action

export const fetchNotes = () => async (dispatch) => {
  const res = await fetch.get('/note')
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

export const deleteNote = (note) => async (dispatch) => {
  const res = await fetch.delete('/note', { params: {id: note.id}})
  if (res.status === 202) {
    dispatch(removeNotes([note.id]))
    dispatch(removeNoteFromNoteBook(note.noteBookId, note.id))
  }
}
