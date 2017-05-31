import React, { Component } from 'react'
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import { convertFromRaw, EditorState } from 'draft-js'
import fetch from 'axios';

import Editor from '../components/Editor'
import Header from '../components/Header'

import Note from '../models/Note'

import { addNewNote, updateNoteContent } from '../action'

class NewNote extends Component {
  static async getInitialProps () {
    const res = await fetch.post('/note')
    
  }
  render () {
    const { title, content } = this.props.note || {}
    return (
      <div>
        <Header />
        <Link href='/'><button className='btn btn-primary'>Back</button></Link>
        <input className='form-control' value={title} />
        <Editor onChange={updateNoteContent} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { query } = ownProps.url
  debugger
  return {
    note: state.notes[query.id],
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { note } = stateProps
  const { dispatch }  = dispatchProps
  return {
    note,
    updateNoteContent: (newContent) => {
      const updatedNote = {
        ...note,
        content: convertToRaw(newContent.getCurrentContent())
      }
      dispatch(updateNote(updatedNote, note.id))
    },
    ...ownProps
  }
}

export default withRedux(initStore, mapStateToProps, null, mergeProps)(NewNote)
