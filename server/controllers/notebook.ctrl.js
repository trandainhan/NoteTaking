import NoteBook from '../../database/NoteBook'
import Note from '../../database/Note'

export const getNoteBook = (req, res) => {
  NoteBook.find().lean().exec((err, noteBooks) => {
    if (err) {
      res.status(500).send('Something broken!')
    }
    res.status(200).json(noteBooks)
  })
}

export const createNoteBook = (req, res) => {
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
}

export const deleteNoteBook = (req, res) => {
  const { id } = req.query
  if (id) {
    NoteBook.remove({_id: id}, (err, doc) => {
      Note.deleteMany({noteBookId: id }, (err, docs) => {
        res.status(202).json(doc)
      })
    })
  }
}
