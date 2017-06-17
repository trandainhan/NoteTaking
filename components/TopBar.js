import React from 'react'
import Note from '../models/Note'
import Link from 'next/link'

import { addNewNote } from '../action/Note'

const TopBar = ({handler}) => (
  <div style={styles.topBar} >
    <Link prefetch href='/newbook'>
      <button style={styles.addNewNoteBook} className='btn btn-primary'>Add New Note Book</button>
    </Link>
    <Link prefetch href='/newnote'>
      <button className='btn btn-primary'>Add New Note</button>
    </Link>
  </div>
)

const styles = {
  topBar: {
    marginBottom: '10px',
    marginLeft: '10px'
  },
  addNewNoteBook: {
    marginRight: '10px'
  }
}

export default TopBar
