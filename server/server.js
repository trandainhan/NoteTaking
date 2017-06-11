import express from 'express'
import next from 'next'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
import bodyParser from 'body-parser'

import Note from '../database/Note'
import NoteBook from '../database/NoteBook'
import database from '../config/database'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Request body parsing middleware should be above methodOverride
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  // Connect to database
  mongoose.connect(database.uri)

  server.get('/notebook', (req, res) => {
    NoteBook.find().lean().exec((err, noteBooks) => {
      if (err) {
        console.log('Something wrong in /notebooks')
        res.status(500).send('Something broke!')
      }
      res.json(noteBooks)
    })
  })

  server.post('/notebook', (req, res) => {
    const { title } = req.body || {} // ?
    const noteBook = new NoteBook({
      title: title || 'Untitle'
    })

    noteBook.save().then((noteBook) => {
      res.status(200).json({
        id: noteBook.id,
        title: noteBook.title
      })
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

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
