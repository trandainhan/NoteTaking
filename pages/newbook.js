import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import fetch from 'axios';
import Header from '../components/Header'

import { addNewNoteBook } from '../action'

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
    const res = await fetch.post('http://localhost:3000/notebook', {
      name: title
    })
    const newNoteBook = new NoteBook(res.data)
    this.props.dispatch(addNewNoteBook(newNoteBook.id, newNoteBook))
    Router.push({
      pathname: '/'
    })
  }
  render () {
    const { title } = this.state.noteBook || {}
    return (
      <div>
        <Header />
        <Link href='/'><button className='btn btn-primary'>Back</button></Link>
        <input className='form-control' value={title} onChange={this.handleChange} />
        <button onClick={this.saveNoteBook} className='form-control'>Save</button>
      </div>
    )
  }
}

export default withRedux(initStore)(NewNoteBook)
