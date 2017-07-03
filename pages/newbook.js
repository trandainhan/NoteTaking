import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import fetch from '../api/Fetch';
import Header from '../components/Header'
import Input from '../components/Input'
import Validator from '../hoc/Validator'
import NoteBook from '../models/NoteBook'
import NavBar from '../components/NavBar'

const ValidateInput = Validator(Input)

class NewNoteBook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      noteBook: new NoteBook()
    }
    this.handleChange = (e) => this._handleChange(e.target.value)
    this.handleKeyPress = (e) => this._handleKeyPress(e)
    this.saveNoteBook = () => this._saveNoteBook()
  }
  _handleChange (newTitle) {
    const { noteBook } = this.state
    noteBook.title = newTitle
    this.setState({
      noteBook: noteBook
    })
  }
  _handleKeyPress (e) {
    const { onKeyPress } = this.props
    if (e.key === 'Enter') {
      this._saveNoteBook()
    }
    onKeyPress && onKeyPress(e)
  }
  async _saveNoteBook () {
    const { title } = this.state.noteBook
    if (!title) {
      return
    }
    const res = await fetch.post('/notebook', {
      title: title
    })
    Router.push({
      pathname: '/'
    })
  }
  render () {
    const { title } = this.state.noteBook || {}
    return (
      <div>
        <Header />
        <NavBar />
        <div style={styles.newBook}>
          <Link href='/'><a style={styles.back} className='btn btn-primary'>Back</a></Link>
          <ValidateInput
            required
            value={title}
            onChange={this.handleChange}
            placeholder='Your NoteBook title here...'
            containerClassName='marginBottom'
            onKeyPress={this.handleKeyPress}
          />
          <button onClick={this.saveNoteBook} className='form-control'>Save</button>
        </div>
      </div>
    )
  }
}

const styles = {
  newBook: {
    margin: 'auto',
    width: '50%',
    marginTop: '10px'
  },
  back: {
    marginBottom: '10px'
  }
}

export default NewNoteBook
