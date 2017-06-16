import {
  INIT_NOTE_BOOK_STATE,
  ADD_NEW_NOTE_BOOK,
  SELECT_NOTE_BOOK,
  REMOVE_NOTE_BOOK,
  REMOVE_NOTE_FROM_NOTE_BOOK
} from '../action/NoteBook'

import { omit, filter } from 'lodash/fp'

import NoteBook from '../models/NoteBook'

export const noteBooks = (state = {}, action) => {
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
    case REMOVE_NOTE_BOOK:
      return omit([action.noteBook.id], state)
    case REMOVE_NOTE_FROM_NOTE_BOOK:
      const noteBook = state[action.noteBookId]
      return {
        ...state,
        [action.noteBookId]: {
          ...noteBook,
          notes: noteBook.notes.filter((noteId) => {
            return noteId !== action.noteId
          })
        }
      }
    default:
      return state
  }
}

export const selectedBookdId = (state = '', action) => {
  switch(action.type) {
    case SELECT_NOTE_BOOK:
      return action.noteBookId
    default:
      return state
  }
}
