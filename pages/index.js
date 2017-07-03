import Head from 'next/head'
import Link from 'next/link'
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import { values, isEmpty, some, pick, filter } from 'lodash-fp'

import { initStore } from '../store'
import SplitView from '../components/SplitView'
import List from '../components/List'
import Header from '../components/Header'
import TopBar from '../components/TopBar'
import SearchBox from '../components/SearchBox'
import NavBar from '../components/NavBar'

import NotePreview from '../container/NotePreview'
import NoteBook from '../container/NoteBook'
import NoteView from '../container/NoteView'

import { fetchNoteBooks } from '../action/NoteBook'
import { fetchNotes } from '../action/Note'
import { updateSearchNote } from '../action'

class Note extends Component {
  componentDidMount () {
    this.props.dispatch(fetchNoteBooks())
    this.props.dispatch(fetchNotes())
  }
  render () {
    const {
      noteBooks,
      selectedNote,
      searchKey,
      handleChangeSearchKey,
      onResetSearchKey
    } = this.props
    const disabledNewNote = values(noteBooks).length === 0
    return (
      <div>
        <Header />
        <NavBar />
        <div style={styles.indexPage}>
          <TopBar disabledNewNote={disabledNewNote} />
          <SplitView leftWidth={'30%'} rightWidth={'70%'}>
            <List className='padding'>
              <SearchBox
                className='marginBottom'
                value={searchKey}
                onChange={handleChangeSearchKey}
                onResetSearchKey={onResetSearchKey}
              />
              {
                isEmpty(noteBooks) ? "No NoteBook!!!" : values(noteBooks).map((noteBook) => (
                  <NoteBook key={noteBook.id} noteBook={noteBook} />
                ))
              }
            </List>
            <NoteView note={selectedNote} className='padding' />
          </SplitView>
        </div>
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

const isNotesContainSearchKey = (notes, searchKey) => {
  return some((note) => {
    return note.title.toLowerCase().includes(searchKey.toLowerCase())
  }, notes)
}

const getNoteBookBySearchKey = (state, searchKey) => {
  const { noteBooks, notes } = state
  if (!searchKey) return noteBooks
  return filter((noteBook) => {
    return (
      noteBook.title.toLowerCase().includes(searchKey.toLowerCase())
      || isNotesContainSearchKey(pick(noteBook.notes, notes), searchKey)
    )
  }, noteBooks)
}

const mapStateToProps = (state) => {
  const { selectedNoteId, searchKey } = state
  return {
    noteBooks: getNoteBookBySearchKey(state, searchKey),
    selectedNote: getSelectedNote(state, selectedNoteId),
    searchKey: searchKey
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeSearchKey: (e) => {
      dispatch(updateSearchNote(e.target.value))
    },
    onResetSearchKey: () => {
      dispatch(updateSearchNote(''))
    },
    dispatch
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Note)
