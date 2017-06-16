import React from 'react'
import { connect } from 'react-redux'
import NotePreview from './NotePreview'
import { values } from 'lodash/fp'

import { deleteNoteBook, updateNoteBook, saveNoteBook } from '../action/NoteBook'

import EditableInput from '../components/EditableInput'

const NoteBook = ({
  notes,
  noteBook,
  deleteNoteBook,
  updateNoteBookTitle,
  saveNoteBook
}) => (
  <div style={styles.noteBook}>
    <EditableInput
      value={noteBook.title}
      style={styles.editableInput}
      onChange={updateNoteBookTitle}
      onFinishEdit={saveNoteBook}
    />
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
  editableInput: {
    marginRight: '20px',
    display: 'flex',
  },
  title: {
    borderBottom: 'solid 1px black',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  noteBook: {
    position: 'relative',
    marginBottom: '10px'
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
    },
    updateNoteBookTitle: (newTitle) => {
      const updatedNoteBook = {
        ...noteBook,
        title: newTitle
      }
      dispatch(updateNoteBook(noteBook.id, updatedNoteBook))
    },
    saveNoteBook: () => {
      saveNoteBook(noteBook)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteBook)
