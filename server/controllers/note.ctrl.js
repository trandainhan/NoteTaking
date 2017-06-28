import Note from '../../database/Note'
import NoteBook from '../../database/NoteBook'

export const getNote = (req, res) => {
  Note.find().lean().exec((err, notes) => {
    if (err) {
      console.log('Something wrong in /note')
      res.status(500).json(err)
    }
    res.status(200).json(notes)
  })
}

export const createNote = (req, res) => {
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
}

export const deleteNote = (req, res) => {
  const { id, noteBookId } = req.query
  if (id) {
    Note.remove({_id: id}, (err, result) => {
      if (err) {
        res.status(404).json(err)
      }
      NoteBook.findById(noteBookId, (err, noteBook) => {
        const noteIndex = noteBook.notes.indexOf(id)
        noteBook.notes.splice(noteIndex, 1)
        noteBook.save((err) => {
          res.status(202).json(result)
        })
      })
    })
  }
}
