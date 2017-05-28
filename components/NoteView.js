import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateNote } from '../action'
import Editor from './Editor'

class NoteView extends Component {

  render() {
    const { title, content } = this.props.note
    return (
      <div>
        <h3>{title}</h3>
        <Editor editorState={content} onChange={this.props.updateNoteContent} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, { note }) => {
  return {
    updateNoteContent: (newState) => {
      const updatedNote = {
        ...note,
        content: newState.getCurrentContent().getPlainText()
      }
      dispatch(updateNote(updatedNote, note.id))
    },
    note
  }
}

export default connect(null, mapDispatchToProps)(NoteView)
