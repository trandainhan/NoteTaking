import React from 'react'
import { connect } from 'react-redux'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import classNames from 'classnames'
import { isUndefined } from 'lodash/fp'

import { updateNote } from '../action/Note'
import Editor from '../components/Editor'
import Input from '../components/Input'


const NoteView = ({note, updateNoteContent, updateNoteTitle, className}) => {
  const clazzName = classNames('NoteView', className, {
    'disabled': isUndefined(note)
  })
  const { title, content } = note || {}
  return (
    <div className={clazzName}>
      <Input
        className='marginBottom'
        value={title || ''}
        onChange={updateNoteTitle}
      />
      <Editor
        editorState={content && EditorState.createWithContent(convertFromRaw(content))}
        onChange={updateNoteContent}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch, { note }) => {
  return {
    updateNoteContent: (newContent) => {
      if (note) {
        const updatedNote = {
          ...note,
          content: convertToRaw(newContent.getCurrentContent())
        }
        dispatch(updateNote(updatedNote, note.id))
      }
    },
    updateNoteTitle: (e) => {
      if (note) {
        dispatch(updateNote({
          ...note,
          title: e.target.value
        }, note.id))
      }
    },
    note
  }
}

export default connect(null, mapDispatchToProps)(NoteView)
