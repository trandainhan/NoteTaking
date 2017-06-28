import express from 'express'
import { getNoteBook, createNoteBook, deleteNoteBook } from '../controllers/notebook.ctrl'

var router = express.Router()

export default (server) => {
  router.route('/')
    .get(getNoteBook)
    .post(createNoteBook)
    .delete(deleteNoteBook)

  server.use('/notebook', router)
}
