export const SELECT_NOTE = 'SELECT_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'

export const selectNote = (noteId) => ({
  type: SELECT_NOTE,
  noteId
})

export const updateNote = (updatedNote, noteId) => ({
  type: UPDATE_NOTE,
  noteId,
  updatedNote
})