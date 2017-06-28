import express from 'express'
import { getNote, createNote, deleteNote } from '../controllers/note.ctrl'

var router = express.Router()

export default (server) => {
  router.route('/')
    .get(getNote)
    .post(createNote)
    .delete(deleteNote)

  server.use('/note', router)
}
