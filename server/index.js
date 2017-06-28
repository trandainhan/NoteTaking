import express from 'express'
import next from 'next'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
import bodyParser from 'body-parser'

import User from '../database/User'
import database from '../config/database'

import NoteRouter from './routes/note.route'
import NoteBookRouter from './routes/notebook.route'
import UserRouter from './routes/user.route'
import AuthenticationRouter from './routes/authentication.route'

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
  NoteBookRouter(server)
  NoteRouter(server)
  UserRouter(server)
  AuthenticationRouter(server)

  server.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username && password) {

    }
    res.status(400).json({
      message: 'Username or Password must not empty'
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
