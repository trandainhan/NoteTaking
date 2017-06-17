import { combineReducers } from 'redux'
import { notes, selectedNoteId } from './notes'
import { noteBooks, selectedBookdId } from './notebooks'
import { SEARCH_NOTE } from '../action/index'

const searchKey = (state = '', action) => {
  switch (action.type) {
    case SEARCH_NOTE:
      return action.searchKey
    default:
      return state
  }
}

const rootReducer = combineReducers({
  noteBooks,
  notes,
  selectedBookdId,
  selectedNoteId,
  searchKey
})

export default rootReducer
