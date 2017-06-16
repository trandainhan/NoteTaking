import React from 'react'
import { connect } from 'react-redux'
import NotePreview from './NotePreview'
import { values } from 'lodash/fp'

import { deleteNoteBook } from '../action/NoteBook'

const NoteBook = ({notes, noteBook, deleteNoteBook}) => (
  <div style={styles.noteBook}>
    <h3 style={styles.title}>{noteBook.title}</h3>
    <span
      style={styles.remove}
      className="glyphicon glyphicon-remove" aria-hidden="true"
      onClick={deleteNoteBook}
    />
    {
      values(notes).map((note) => (
        <NotePreview key={note.id} note={note} />
      ))
    }
  </div>
)

const styles = {
  title: {
    borderBottom: 'solid 1px black'
  },
  noteBook: {
    position: 'relative'
  },
  remove: {
    position: 'absolute',
    right: '5px',
    top: '5px',
    cursor: 'pointer',
    color: 'red'
  }
}

const findNotesByNoteBook = (state, noteBook) => {
  const { notes: noteIds } = noteBook
  const { notes: allNotes } = state
  return Object.keys(allNotes).filter(key => noteIds.includes(key)).reduce((obj, key) => {
    obj[key] = allNotes[key]
    return obj
  }, {})
}

const mapStateToProps = (state, { noteBook }) => {
  return {
    notes: findNotesByNoteBook(state, noteBook)
  }
}

const mapDispatchToProps = (dispatch, { noteBook }) => {
  return {
    deleteNoteBook: () => {
      dispatch(deleteNoteBook(noteBook))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteBook)
