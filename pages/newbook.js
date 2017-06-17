import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import fetch from '../api/Fetch';
import Header from '../components/Header'
import Input from '../components/Input'
import NoteBook from '../models/NoteBook'

class NewNoteBook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      noteBook: new NoteBook()
    }
    this.handleChange = (e) => this._handleChange(e.target.value)
    this.saveNoteBook = () => this._saveNoteBook()
  }
  _handleChange (newTitle) {
    const { noteBook } = this.state
    noteBook.title = newTitle
    this.setState({
      noteBook: noteBook
    })
  }
  async _saveNoteBook () {
    const { title } = this.state.noteBook
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
      <div style={styles.newBook}>
        <Header />
        <Link href='/'><a style={styles.back} className='btn btn-primary'>Back</a></Link>
        <Input
          style={styles.title}
          value={title}
          onChange={this.handleChange}
          placeholder='Your NoteBook title here...'
        />
        <button onClick={this.saveNoteBook} className='form-control'>Save</button>
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
  },
  title: {
    marginBottom: '10px'
  }
}

export default NewNoteBook
