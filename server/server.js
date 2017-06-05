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

  server.get('/notebooks', (req, res) => {
    NoteBook.find({}, (err, notebooks) => {
      if (err) {
        console.log('Something wrong in /notebooks')
        res.status(500).send('Something broke!')
      }
      res.json(notebooks)
    })
  })

  server.post('/noteBooks', (req, res) => {
    const { title } = req.body // ?
    const noteBook = new NoteBook({
      title: title || 'Untitle'
    })
    noteBook.save().then((note) => {
      res.status(200).send('Save successfully')
    })
  })

  server.post('/note', (req, res) => {
    console.log(req.body)
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
