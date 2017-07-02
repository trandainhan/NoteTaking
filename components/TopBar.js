import React from 'react'
import Note from '../models/Note'
import Link from 'next/link'

import { addNewNote } from '../action/Note'

import Button from './Button'

const TopBar = ({handler, disabledNewNote}) => (
  <div style={styles.topBar} >
    <Link prefetch href='/newbook'>
      <Button style={styles.addNewNoteBook} type={Button.TYPE.PRIMARY}>Add New Note Book</Button>
    </Link>
    <Link prefetch href='/newnote'>
      <Button disabled={disabledNewNote} type={Button.TYPE.PRIMARY}>Add New Note</Button>
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
