import React, { Component } from 'react'
import Head from 'next/head'

export default class NotePreview extends Component {
  render () {
    const { title, createdDate, content } = this.props
    return (
      <div className='note-preview'>
        <h4 className='note-title'>{title}</h4>
        <div className='note-create-date'>{createdDate}</div>
        <div className='note-content-preview' style={styles.noteContentPreview}>
          {content}
        </div>
      </div>
    )
  }
}

const styles = {
  noteContentPreview: {
    height: '50px'
  }
}
