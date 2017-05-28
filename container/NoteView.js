import React from 'react'
import { connect } from 'react-redux'
import { updateNote } from '../action'
import Editor from '../components/Editor'

const NoteView = ({title, content, updateNoteContent}) => (
  <div>
    <h3>{title}</h3>
    <Editor editorState={content} onChange={updateNoteContent} />
  </div>
)

const mapDispatchToProps = (dispatch, { note }) => {
  return {
    updateNoteContent: (newState) => {
      const updatedNote = {
        ...note,
        content: newState.getCurrentContent().getPlainText()
      }
      dispatch(updateNote(updatedNote, note.id))
    },
    ...note
  }
}

export default connect(null, mapDispatchToProps)(NoteView)
