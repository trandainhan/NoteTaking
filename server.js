require('babel-register')
const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Note = require('./database/Note')
const NoteBook = require('./database/NoteBook')
const database = require('./config/database')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Connect to database
  mongoose.connect(database.uri)

  server.get('/notebooks', (req, res) => {

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
