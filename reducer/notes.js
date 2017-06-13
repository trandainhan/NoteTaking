import { UPDATE_NOTE, ADD_NEW_NOTE, INIT_NOTE_STATE } from '../action'
import { convertToRaw, ContentState } from 'draft-js'

const initState = {
  211: {
    id: '211',
    title: 'Nhan',
    createdDate: 'Today',
    content: convertToRaw(ContentState.createFromText('This is note 1')),
    noteBookId: '123'
  },
  222: {
    id: '222',
    title: 'Nhan 2',
    createdDate: 'Yesterday',
    content: convertToRaw(ContentState.createFromText('This is note 2')),
    noteBookId: '123'
  },
  223: {
    id: '223',
    title: 'Nhan 3',
    createdDate: 'Yesterday',
    content: convertToRaw(ContentState.createFromText('This is note 3')),
    noteBookId: '111'
  }
}

const notes = (state = {}, action) => {
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

export default notes
