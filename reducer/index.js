import { SELECT_NOTE } from '../action'
import { uniqueId } from 'lodash-fp'

const initState = {
  noteBooks: {
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
  },
  notes: {
    211: {
      id: '211',
      title: 'Nhan',
      createdDate: 'Today',
      content: 'This is note 1',
      book_id: '123'
    },
    222: {
      id: '222',
      title: 'Nhan 2',
      createdDate: 'Yesterday',
      content: 'This is note 2',
      book_id: '123'
    },
    223: {
      id: '223',
      title: 'Nhan 3',
      createdDate: 'Yesterday',
      content: 'This is note 3',
      book_id: '111'
    }
  },
  selectedNoteId: '223'
}

const reducer = (state = initState, action) => {
  switch(action.type) {
    case SELECT_NOTE:
      return {
        ...state,
        selectedNoteId: action.noteId
      }
    default:
      return state
  }
}

export default reducer
