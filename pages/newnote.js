import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Head from 'next/head'
import { EditorState, convertToRaw } from 'draft-js'
import fetch from 'axios';
import Select from 'react-select'

import Editor from '../components/Editor'
import Header from '../components/Header'

import { addNewNote, updateNote } from '../action'

class NewNote extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: EditorState.createEmpty(),
      selectedNoteBookId: '',
      noteBooks: []
    }
    this.updateNoteContent = (newContent) => this._updateNoteContent(newContent)
    this.updateTitle = (e) => this._updateTitle(e.target.value)
    this.saveNote = () => this._saveNote()
    this.updateSelectedNoteBook = (selectedOption) => this._updateSelectedNoteBook(selectedOption)
  }
  _updateNoteContent (newContent) {
    this.setState({
      content: newContent
    })
  }
  async _saveNote () {
    const { title, content, selectedNoteBookId } = this.state
    console.log(JSON.stringify(convertToRaw(content.getCurrentContent())))
    const res = await fetch.post('http://localhost:3000/note', {
      title: title,
      content: JSON.stringify(convertToRaw(content.getCurrentContent())),
      noteBookId: selectedNoteBookId
    })
    Router.push({
      pathname: '/'
    })
  }
  _updateTitle (title) {
    this.setState({
      title: title
    })
  }
  _updateSelectedNoteBook (selectedOption) {
    this.setState({
      selectedNoteBookId: selectedOption ? selectedOption.value : ''
    })
  }
  async componentDidMount () {
    const res = await fetch.get('http://localhost:3000/notebook')
    const noteBooks = res.data.map((noteBook) => {
      return {
        value: noteBook._id,
        label: noteBook.title
      }
    })
    this.setState({
      noteBooks: noteBooks
    })
  }
  render () {
    const { noteBooks, selectedNoteBookId, title, content } = this.state
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
          editorState={content}
          onChange={this.updateNoteContent}
        />
        <button onClick={this.saveNote} className='form-control'>Save</button>
      </div>
    )
  }
}

export default NewNote
