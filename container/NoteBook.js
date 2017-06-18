import React from 'react'
import { connect } from 'react-redux'
import NotePreview from './NotePreview'
import { values, pick, filter } from 'lodash/fp'

import createConfirmation from '../hoc/createConfirmation'

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
    paddingRight: '20px',
    display: 'flex',
    background: '#e6e6e6'
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

const findNotesByNoteBook = (noteBook, notes) => {
  const { notes: noteIds } = noteBook
  return pick(noteIds, notes)
}

const isNoteBookTitleContainSearchKey = (noteBook, searchKey) => {
  return noteBook.title.includes(searchKey)
}

const getNoteBySearchKey = (state, notes) => {
  const { searchKey, noteBooks } = state
  if (!searchKey) return notes
  return filter((note) => {
    return (
      note.title.includes(searchKey)
      || isNoteBookTitleContainSearchKey(noteBooks[note.noteBookId], searchKey)
    )
  }, notes)
}

const getNotes = (state, noteBook) => {
  const { searchKey, noteBooks, notes } = state
  const notesByBook = findNotesByNoteBook(noteBook, notes)
  return getNoteBySearchKey(state, notesByBook)
}

const mapStateToProps = (state, { noteBook }) => {
  return {
    notes: getNotes(state, noteBook)
  }
}

const mapDispatchToProps = (dispatch, { noteBook }) => {
  return {
    deleteNoteBook: () => {
      createConfirmation('Delete Note Book', () => {
        dispatch(deleteNoteBook(noteBook))
      })
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
