import { combineReducers } from 'redux'
import { notes, selectedNoteId } from './notes'
import { noteBooks, selectedBookdId } from './notebooks'

const rootReducer = combineReducers({
  noteBooks, notes, selectedBookdId, selectedNoteId
})

export default rootReducer
