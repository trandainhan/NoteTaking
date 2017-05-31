import express from 'express'
import next from 'next'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

import Note from '../database/Note'
import NoteBook from '../database/NoteBook'
import database from '../config/database'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Connect to database
  mongoose.connect(database.uri)

  server.get('/notebooks', (req, res) => {
    const note = new Note({
      title: 'nhan',
      content: 'Hello',
      boot_id: '11'
    })
    note.save()
    
    res.json({
      test: "tran dai nhan"
    })
  })

  server.post('/noteBooks', (req, res) => {
    const { title } = req.body // ?
    const noteBook = new NoteBook({
      title: title
    })
    noteBook.save()
    return res.json({
      nhan: 'test'
    })
  })

  server.post('/note', (req, res) => {
    const note = new Note({
      title: '',
      content: '',
      boot_id: '????'
    })
    return res.json({
      tran: 'test'
    })
  })


  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(4000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:4000')
  })
})
