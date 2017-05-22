import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const initState = {
  noteBooks: [{ // noteBook
    id: 'noteBook-1'
    notes: [
      { // note
        id:
        title: '',
        createdDate: '',
        content: ''
      }
    ], // notes
  },{ // noteBook
    id: 'noteBook-2'
    notes: [

    ]
  }],
  selectedNote: { //

  }
}

const reducer = (state, action) => {
  return state;
}




export const initStore = (initialState = initState) => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}
