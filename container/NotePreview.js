import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { convertFromRaw, ContentState } from 'draft-js'
import { selectNote, deleteNote } from '../action/Note'

const NotePreview = ({title, createdDate, setSelectedNote, deleteNote}) => {
  return (
    <div className='note-preview' style={styles.notePreview}>
      <div onClick={setSelectedNote} style={styles.selectNote} >
        <div className='note-create-date' style={styles.noteCreateDate}>{createdDate}</div>
        <div className='note-title' style={styles.title}>
          {title}
        </div>
      </div>
      <span
        style={styles.removeIcon}
        className="glyphicon glyphicon-remove" aria-hidden="true"
        onClick={deleteNote}
      />
      <div style={{clear: 'both'}}></div>
    </div>
  )

}

const styles = {
  notePreview: {
    position: 'relative'
  },
  selectNote: {
    marginRight: '20px',
    display: 'flex',
    cursor: 'pointer'
  },
  noteCreateDate: {
    width: '35%',
    float: 'left'
  },
  title: {
    width: '65%',
    float: 'right',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  removeIcon: {
    cursor: 'pointer',
    color: 'red',
    position: 'absolute',
    right: '5px',
    top: '3px'
  }
}

const mapDispatchToProps = (dispatch, { note }) => {
  return {
    setSelectedNote: (e) => {
      dispatch(selectNote(note.id))
    },
    deleteNote: () => {
      dispatch(deleteNote(note))
    },
    ...note
  }
}

export default connect(null, mapDispatchToProps)(NotePreview)
