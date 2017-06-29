import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Head from 'next/head'
import { EditorState, convertToRaw } from 'draft-js'
import fetch from '../api/Fetch';
import Select from 'react-select'

import Editor from '../components/Editor'
import Header from '../components/Header'
import Input from '../components/Input'
import NavBar from '../components/NavBar'

import { addNewNote, updateNote } from '../action/Note'

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
    this.updateTitle = (e) => { this._updateTitle(e.target.value) }
    this.saveNote = () => { this._saveNote() }
    this.updateSelectedNoteBook = (selectedOption) => this._updateSelectedNoteBook(selectedOption)
  }
  _updateNoteContent (newContent) {
    this.setState({
      content: newContent
    })
  }
  async _saveNote () {
    const { title, content, selectedNoteBookId } = this.state
    const res = await fetch.post('/note', {
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
    const res = await fetch.get('/notebook')
    const noteBooks = res.data.map((noteBook) => {
      return {
        value: noteBook._id,
        label: noteBook.title
      }
    })
    this.setState({
      noteBooks: noteBooks,
      selectedNoteBookId: noteBooks[0].value
    })
  }
  render () {
    const { noteBooks, selectedNoteBookId, title, content } = this.state
    return (
      <div>
        <NavBar />
        <div style={styles.newNote} >
          <Header />
          <Head>
            <link rel="stylesheet" href="/static/css/react-select.css" />
          </Head>
          <Link href='/'><a className='btn btn-primary marginBottom'>Back</a></Link>
          <Select
            className='marginBottom'
            name="form-field-name"
            options={noteBooks}
            value={selectedNoteBookId}
            onChange={this.updateSelectedNoteBook}
          />
          <Input
            className='marginBottom'
            value={title}
            onChange={this.updateTitle}
            placeholder='Your Note title here...'
          />
          <Editor
            className='marginBottom'
            editorState={content}
            onChange={this.updateNoteContent}
            placeholder='Note content here...'
          />
          <button
            style={styles.save}
            onClick={this.saveNote}
            className='form-control'>
            Save
          </button>
        </div>
      </div>  
    )
  }
}

const styles = {
  newNote: {
    margin: 'auto',
    width: '80%',
    marginTop: '10px'
  },
  save: {
    width: '20%',
    margin: 'auto'
  }
}

export default NewNote
