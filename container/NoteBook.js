import React from 'react'
import { connect } from 'react-redux'
import NotePreview from './NotePreview'
import { values } from 'lodash/fp'

const NoteBook = ({notes, noteBook}) => (
  <div>
    <h3 style={styles.title}>{noteBook.title}</h3>
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

export default connect(mapStateToProps)(NoteBook)
