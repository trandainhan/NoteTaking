import Head from 'next/head'
import Link from 'next/link'
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import { values, isEmpty } from 'lodash-fp'

import { initStore } from '../store'
import SplitView from '../components/SplitView'
import List from '../components/List'
import Header from '../components/Header'
import TopBar from '../components/TopBar'
import SearchBox from '../components/SearchBox'

import NotePreview from '../container/NotePreview'
import NoteBook from '../container/NoteBook'
import NoteView from '../container/NoteView'

import { fetchNoteBooks } from '../action/NoteBook'
import { fetchNotes } from '../action/Note'
import { updateSearchNote } from '../action'

class IndexPage extends Component {
  componentDidMount () {
    this.props.dispatch(fetchNoteBooks())
    this.props.dispatch(fetchNotes())
  }
  render () {
    const { noteBooks, selectedNote, searchKey, handleChangeSearchKey } = this.props
    return (
      <div style={styles.indexPage}>
        <Header />
        <TopBar />
        <SplitView leftWidth={'30%'} rightWidth={'70%'}>
          <List className='padding'>
            <SearchBox
              className='marginBottom'
              value={searchKey}
              onChange={handleChangeSearchKey}
            />
            {
              isEmpty(noteBooks) ? "No NoteBook Yet" : values(noteBooks).map((noteBook) => (
                <NoteBook key={noteBook.id} noteBook={noteBook} />
              ))
            }
          </List>
          <NoteView note={selectedNote} className='padding' />
        </SplitView>
      </div>
    )
  }
}

const styles = {
  indexPage: {
    margin: '20px'
  }
}

const getSelectedNote = (state, noteId) => {
  return state.notes[noteId] || values(state.notes)[0]
}

const getNoteBookBySearchKey = (noteBooks, searchKey) => {
  if (!searchKey) return noteBooks
  const result = {}
  Object.keys(noteBooks).forEach((key) => {
    noteBooks[key].title.includes(searchKey) && (result[key] = noteBooks[key])
  })
  return result
}

const mapStateToProps = (state) => {
  const { noteBooks, selectedNoteId, searchKey } = state
  return {
    noteBooks: getNoteBookBySearchKey(noteBooks, searchKey),
    selectedNote: getSelectedNote(state, selectedNoteId),
    searchKey: searchKey
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeSearchKey: (e) => {
      dispatch(updateSearchNote(e.target.value))
    },
    dispatch
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(IndexPage)
