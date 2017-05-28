import { UDPATE_NOTE } from '../action'

const initState = {
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
}

const notes = (state = initState, action) => {
  switch(action.type) {
    case UDPATE_NOTE:
      return {
        ...state,
        [action.noteId]: action.updatedNote
      }
    default:
      return state
  }
}

export default notes
