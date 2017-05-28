import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { convertFromRaw, ContentState } from 'draft-js'
import { selectNote } from '../action'

const NotePreview = ({title, createdDate, content, setSelectedNote}) => (
  <div className='note-preview' onClick={setSelectedNote} style={styles.notePreview}>
    <h4 className='note-title'>{title}</h4>
    <div className='note-create-date' style={styles.noteCreateDate}>{createdDate}</div>
    <div className='note-content-preview' style={styles.noteContentPreview}>
      {convertFromRaw(content).getPlainText()}
    </div>
    <div style={{clear: 'both'}}></div>
  </div>
)

const styles = {
  noteCreateDate: {
    width: '30%',
    float: 'left'
  },
  noteContentPreview: {
    width: '70%',
    float: 'right',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  notePreview: {
     cursor: 'pointer'
  }
}

const mapDispatchToProps = (dispatch, { note }) => {
  return {
    setSelectedNote: (e) => {
      dispatch(selectNote(note.id))
    },
    ...note
  }
}


export default connect(null, mapDispatchToProps)(NotePreview)
