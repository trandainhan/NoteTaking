import React, { Component } from 'react'
import NotePreview from './NotePreview'
import { values } from 'lodash-fp'

class NoteBook extends Component {
  render() {
    const { notes, title } = this.props
    return (
      <div>
        <h3>{title}</h3>
        {
          values(notes).map((note) => (
            <NotePreview key={note.id} note={note} />
          ))
        }
      </div>
    )
  }
}

export default NoteBook
