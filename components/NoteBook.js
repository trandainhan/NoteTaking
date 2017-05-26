import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotePreview from './NotePreview'
import { values } from 'lodash-fp'

class NoteBook extends Component {
  render() {
    const { notes, noteBook } = this.props
    return (
      <div>
        <h3>{noteBook.name}</h3>
        {
          values(notes).map((note) => (
            <NotePreview key={note.id} note={note} />
          ))
        }
      </div>
    )
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
