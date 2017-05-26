import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from './Editor'

class NoteView extends Component {

  render() {
    const { title, content } = this.props.note
    return (
      <div>
        <h3>{title}</h3>
        <Editor editorState={content} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // udpate note, selectedNote

  }
}

export default connect(null, mapDispatchToProps)(NoteView)
