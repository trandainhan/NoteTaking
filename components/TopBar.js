import React from 'react'
import Note from '../models/Note'
import Link from 'next/link'

import { addNewNote } from '../action'

const TopBar = ({handler}) => (
  <div>
    <Link prefetch href='/newbook'>
      <button className='btn btn-primary'>Add New Note Book</button>
    </Link>
    <Link prefetch href='/newnote'>
      <button className='btn btn-primary'>Add New Note</button>
    </Link>
  </div>
)

export default TopBar
