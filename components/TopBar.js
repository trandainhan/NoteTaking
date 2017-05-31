import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'

import Note from '../models/Note'

import { addNewNote } from '../action'

const TopBar = ({handler}) => (
  <div>
    <button onClick={handler} className='btn btn-primary'>Add New Note</button>
  </div>
)

const mapDispatchToProps = (dispath) => {
  return {
    handler: () => {
      const note = new Note();
      dispath(addNewNote(note.id, note))
      Router.push({
        pathname: 'newnote',
        query: { id: note.id }
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(TopBar)
