import {
  SELECT_NOTE,
  SELECT_NOTE_BOOK,
  ADD_NEW_NOTE_BOOK,
  INIT_NOTE_BOOK_STATE
} from '../action'
import { combineReducers } from 'redux'

import notes from './notes'
import NoteBook from '../models/NoteBook'

const noteBooks = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_NOTE_BOOK:
      return {
        ...state,
        [action.noteBookId]: action.noteBook
      }
    case INIT_NOTE_BOOK_STATE:
      const result = action.data.reduce((result, noteBook) => {
        noteBook = new NoteBook(noteBook)
        result[noteBook.id] = noteBook
        return result
      }, {})
      return result;
    default:
      return state
  }
}

const selectedNoteId = (state = '223', action) => {
  switch(action.type) {
    case SELECT_NOTE:
      return action.noteId
    default:
      return state
  }
}

const selectedBookdId = (state = '123', action) => {
  switch(action.type) {
    case SELECT_NOTE_BOOK:
      return action.noteBookId
    default:
      return state
  }
}

const rootReducer = combineReducers({
  noteBooks, selectedNoteId, selectedBookdId, notes
})

export default rootReducer
