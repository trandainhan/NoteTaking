import React from 'react'
import { connect } from 'react-redux'
import { updateNote } from '../action'
import Editor from '../components/Editor'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'

const NoteView = ({title, content, updateNoteContent}) => (
  <div>
    <h3>{title}</h3>
    <Editor
      editorState={content && EditorState.createWithContent(convertFromRaw(content))}
      onChange={updateNoteContent}
    />
  </div>
)

const mapDispatchToProps = (dispatch, { note }) => {
  return {
    updateNoteContent: (newContent) => {
      const updatedNote = {
        ...note,
        content: convertToRaw(newContent.getCurrentContent())
      }
      dispatch(updateNote(updatedNote, note.id))
    },
    ...note
  }
}

export default connect(null, mapDispatchToProps)(NoteView)
