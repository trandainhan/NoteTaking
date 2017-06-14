import {
  UPDATE_NOTE,
  ADD_NEW_NOTE,
  INIT_NOTE_STATE,
  SELECT_NOTE
} from '../action'
import { convertToRaw, ContentState } from 'draft-js'

export const notes = (state = {}, action) => {
  switch(action.type) {
    case INIT_NOTE_STATE:
      const result = action.data.reduce((acc, note) => {
        acc[note.id] = note
        return acc
      }, {})
      return result
    case UPDATE_NOTE:
      return {
        ...state,
        [action.noteId]: action.updatedNote
      }
    case ADD_NEW_NOTE:
      return {
        ...state,
        [action.noteId]: action.note
      }
    default:
      return state
  }
}

export const selectedNoteId = (state = '', action) => {
  switch(action.type) {
    case SELECT_NOTE:
      return action.noteId
    default:
      return state
  }
}
