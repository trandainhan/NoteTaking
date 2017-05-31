import Head from 'next/head'
import Link from 'next/link'
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'

import SplitView from '../components/SplitView'
import List from '../components/List'
import Header from '../components/Header'

import NotePreview from '../container/NotePreview'
import NoteBook from '../container/NoteBook'
import NoteView from '../container/NoteView'

import TopBar from '../components/TopBar'

import { values } from 'lodash-fp'

class IndexPage extends Component {
  render () {
    const { noteBooks, selectedNote } = this.props
    return (
      <div style={{margin: 20}}>
        <Header />
        <TopBar />
        <SplitView leftWidth={'20%'} rightWidth={'80%'}>
          <List>
            {
              values(noteBooks).map((noteBook) => (
                <NoteBook key={noteBook.id} noteBook={noteBook} />
              ))
            }
          </List>
          <NoteView note={selectedNote} />
        </SplitView>
      </div>
    )
  }
}

const getSelectedNote = (state, noteId) => {
  return state.notes[noteId]
}

const mapStateToProps = (state) => {
  const { noteBooks, selectedNoteId } = state
  return {
    noteBooks: noteBooks,
    selectedNote: getSelectedNote(state, selectedNoteId)
  }
}

export default withRedux(initStore, mapStateToProps)(IndexPage)
