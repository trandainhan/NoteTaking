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
      <div style={styles.newNote} >
        <Header />
        <Head>
          <link rel="stylesheet" href="https://unpkg.com/react-select/dist/react-select.css" />
        </Head>
        <Link href='/'><a style={styles.back} className='btn btn-primary'>Back</a></Link>
        <Select
          style={styles.selectBook}
          name="form-field-name"
          options={noteBooks}
          value={selectedNoteBookId}
          onChange={this.updateSelectedNoteBook}
        />
        <input
          style={styles.title}
          className='form-control'
          value={title}
          onChange={this.updateTitle}
          placeholder='Your Note title here...'
        />
        <Editor
          editorState={content}
          onChange={this.updateNoteContent}
          placeholder='Note content here...'
          style={styles.editor}
        />
        <button
          style={styles.save}
          onClick={this.saveNote}
          className='form-control'>
          Save
        </button>
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
  back: {
    marginBottom: '10px',
  },
  selectBook: {
    marginBottom: '10px'
  },
  title: {
    marginBottom: '10px'
  },
  editor: {
    marginBottom: '10px'
  },
  save: {
    width: '20%',
    margin: 'auto'
  }
}

export default NewNote
