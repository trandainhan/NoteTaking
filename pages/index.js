import Head from 'next/head'
import Link from 'next/link'
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'

import SplitView from '../components/SplitView'
import NotePreview from '../components/NotePreview'
import NoteBook from '../components/NoteBook'

class MyPage extends Component {
  render () {
    const { noteBooks, selectedNote } = this.props
    return (
      <div>
        <Head>
          <meta charset="utf-8" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        </Head>
        <SplitView>
          <List>
            {
              noteBooks.map((noteBook) => (
                <NoteBook notes={noteBook.notes} />
              ))
            }
          </List>
          <NoteView note={selectedNote} />
        </SplitView>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { noteBooks, selectedNote } = state
  return {
    noteBooks,
    selectedNote
  }
}

export default withRedux(initStore, mapStateToProps)(Mypage)
