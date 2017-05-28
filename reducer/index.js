import { SELECT_NOTE } from '../action'
import { uniqueId } from 'lodash-fp'
import { combineReducers } from 'redux'

import notes from './notes'

const initNoteBooksState = {
  123: {
    id: '123',
    name: 'English',
    notes: [ '211', '222' ]
  },
  111: {
    id: '111',
    name: 'Others',
    notes: ['223']
  }
}

const noteBooks = (state = initNoteBooksState, action) => {
  return state
}

const selectedNoteId = (state = '223', action) => {
  switch(action.type) {
    case SELECT_NOTE:
      return action.noteId
    default:
      return state
  }
}

const rootReducer = combineReducers({
  noteBooks, selectedNoteId, notes
})

export default rootReducer
