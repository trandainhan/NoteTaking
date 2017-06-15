import React from 'react'
import { connect } from 'react-redux'
import { updateNote } from '../action/Note'
import Editor from '../components/Editor'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'

import { debounceSaveNote } from '../action/Note'

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
      debounceSaveNote(updatedNote)
      dispatch(updateNote(updatedNote, note.id))
    },
    ...note
  }
}

export default connect(null, mapDispatchToProps)(NoteView)
