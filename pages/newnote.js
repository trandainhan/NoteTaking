import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js'
import fetch from 'axios';
import Select from 'react-select'

import Editor from '../components/Editor'
import Header from '../components/Header'

import Note from '../models/Note'

import { addNewNote, updateNote } from '../action'

class NewNote extends Component {
  constructor (props) {
    super(props)
    this.state = {
      note: new Note(),
      selectedNoteBookId: '',
      noteBooks: []
    }
    this.updateNoteContent = (newContent) => this._updateNoteContent(newContent)
    this.updateTitle = (e) => this._updateTitle(e.target.value)
    this.saveNote = () => this._saveNote()
    this.updateSelectedNoteBook = (value) => this._updateSelectedNoteBook(value)
  }
  _updateNoteContent (newContent) {
    const { note } = this.state
    note.content = convertToRaw(newContent.getCurrentContent())
    this.setState({
      note: note
    })
  }
  async _saveNote () {
    const { title, content } = this.state.note
    const res = await fetch.post('/note', {
      title: title,
      content: content,
      noteBookId: this.state.selectedNoteBookId
    })
  }
  __updateSelectedNoteBook (value) {
    this.setState({
      selectedNoteBookId: value
    })
  }
  _updateTitle (title) {
    const { note } = this.state
    note.title = title
    this.setState({
      note: note
    })
  }
  _updateSelectedNoteBook (value) {
    this.setState({
      selectedNoteBookId: value
    })
  }
  async componentDidMount () {
    const res = await fetch.get('http://localhost:3000/notebook')
    const noteBooks = res.data.map((noteBook) => {
      return {
        id: noteBook._id,
        label: noteBook.title
      }
    })
    this.setState({
      noteBooks: noteBooks
    })
  }
  render () {
    const { noteBooks, selectedNoteBookId, note } = this.state
    const { title, content } = note
    return (
      <div>
        <Header />
        <Head>
          <link rel="stylesheet" href="https://unpkg.com/react-select/dist/react-select.css" />
        </Head>
        <Link href='/'><button className='btn btn-primary'>Back</button></Link>
        <Select
          name="form-field-name"
          options={noteBooks}
          value={selectedNoteBookId}
          onChange={this.updateSelectedNoteBook}
        />
        <input className='form-control' value={title} onChange={this.updateTitle} />
        <Editor
          editorState={EditorState.createWithContent(convertFromRaw(content))}
          onChange={this.updateNoteContent}
        />
        <button onClick={this.saveNote} className='form-control'>Save</button>
      </div>
    )
  }
}

export default NewNote
