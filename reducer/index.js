const initState = {
  noteBooks: {
    'noteBook-1': { // noteBook
      id: 'noteBook-1',
      name: 'sdfsdf',
      notes: {
        note1: { // note
          id: 'note1',
          title: 'Nhan',
          createdDate: 'Today',
          content: 'Bla blaa'
        },
        note2: { // note
          id: 'note2',
          title: 'Nhan 2',
          createdDate: 'Yesterday',
          content: 'Bla blaa bla'
        }
      }, // notes
    },

    'noteBook-2': { // noteBook
      name: 'noteBook-2',
      notes: {
      }
    }
  },
  selectedNote: {
    id: 'note2',
    title: 'Nhan 2',
    createdDate: 'Yesterday',
    content: 'Bla bla bla'
  }
}

const reducer = (state = initState, action) => {
  return state
}

export default reducer
