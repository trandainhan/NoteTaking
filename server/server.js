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
        res.status(500).send('Something broken!')
      }
      res.status(200).json(noteBooks)
    })
  })

  server.post('/notebook', (req, res) => {
    const { title, id, notes } = req.body
    if (id) {
      NoteBook.findByIdAndUpdate(id, {
        title: title,
        notes: notes
      }, (err, noteBook) => {
        if (err) {
          json.status(400).json(err)
          return
        }
        res.status(201).json(noteBook)
      })
    } else {
      const noteBook = new NoteBook({
        title: title || 'Untitle'
      })

      noteBook.save().then((noteBook) => {
        res.status(200).json({
          id: noteBook.id,
          title: noteBook.title
        })
      })
    }
  })

  server.delete('/notebook', (req, res) => {
    const { id } = req.query
    if (id) {
      NoteBook.remove({_id: id}, (err, doc) => {
        Note.deleteMany({noteBookId: id }, (err, docs) => {
          res.status(202).json(doc)
        })
      })
    }
  })

  server.post('/note', (req, res) => {
    const { title, content, noteBookId, id } = req.body
    if (id) {
      Note.findByIdAndUpdate(id, {
        title: title,
        content: content,
        noteBookId: noteBookId
      }, (err, note) => {
        if (err) {
          json.status(400).send("Somthing wrong")
          return
        }
        res.status(200).json(note.toJSON())
      })
    } else {
      const note = new Note({
        title: title,
        content: content,
        noteBookId: noteBookId
      })
      const findNoteBookAndAddNote = (err, note) => {
        if (err) {
          res.status(400).send('Can not save')
        }
        NoteBook.findById(noteBookId, (err, noteBook) => {
          if (noteBook && !noteBook.notes.includes(note.id)) {
            noteBook.notes.push(note.id)
            noteBook.save()
          }
        })
        res.status(200).json(note.toJSON())
      }
      note.save(findNoteBookAndAddNote)
    }
  })

  server.get('/note', (req, res) => {
    Note.find().lean().exec((err, notes) => {
      if (err) {
        console.log('Something wrong in /note')
        res.status(500).json(err)
      }
      res.status(200).json(notes)
    })
  })

  server.delete('/note', (req, res) => {
    const { id } = req.query
    if (id) {
      Note.remove({_id: id}, (err, result) => {
        if (err) {
          res.status(404).json(err)
        }
        res.status(202).json(result)
      })
    }
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
