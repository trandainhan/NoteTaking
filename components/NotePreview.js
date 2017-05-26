import React, { Component } from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { selectNote } from '../action'

const styles = {
  noteContentPreview: {
    height: '50px'
  }
}

class NotePreview extends Component {
  render () {
    const { title, createdDate, content } = this.props.note
    return (
      <div className='note-preview' onClick={this.props.setSelectedNote}>
        <h4 className='note-title'>{title}</h4>
        <div className='note-create-date'>{createdDate}</div>
        <div className='note-content-preview' style={styles.noteContentPreview}>
          {content}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, { note }) => {
  return {
    setSelectedNote: (e) => {
      dispatch(selectNote(note.id))
    },
    note
  }
}


export default connect(null, mapDispatchToProps)(NotePreview)
