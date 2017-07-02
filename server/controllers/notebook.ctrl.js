import NoteBook from '../../database/NoteBook'
import Note from '../../database/Note'
import User from '../../database/User'

export const getNoteBook = (req, res) => {
  NoteBook.find({userId: req.cookies['userId']}).lean().exec((err, noteBooks) => {
    if (err) {
      res.status(500).send('Something broken!')
    }
    res.status(200).json(noteBooks)
  })
}

export const createNoteBook = (req, res) => {
  const { title, id, notes } = req.body
  const userId = req.cookies['userId']
  if (id) {
    NoteBook.findByIdAndUpdate(id, {
      title: title,
      notes: notes
    }, (err, noteBook) => {
      if (err) {
        json.status(400).json(err)
        return
      }
      if (noteBook) {
        res.status(201).json(noteBook.toJSON())
      } else {
        res.status(404).json({
          success: false,
          message: 'Can not find the NoteBook to update'
        })
      }
    })
  } else {
    const noteBook = new NoteBook({
      title: title || 'Untitle',
      userId: userId
    })

    noteBook.save().then((noteBook) => {
      User.findById(userId, (err, user) => {
        if (user && !user.notebooks.includes(noteBook.id)) {
          user.notebooks.push(noteBook.id)
          user.save()
        }
      })
      res.status(200).json({
        id: noteBook.id,
        title: noteBook.title,
        userId: noteBook.userId
      })
    })
  }
}

export const deleteNoteBook = (req, res) => {
  const { id } = req.query
  const userId = req.cookies['userId']
  if (id) {
    NoteBook.remove({_id: id}, (err, noteBook) => {
      if (err) {
        throw err
      }
      Note.deleteMany({noteBookId: id })
      User.findById(userId, (err, user) => {
        if (err) {
          throw err
        }
        const noteBookIndex = user.notebooks.indexOf(id)
        user.notebooks.splice(noteBookIndex, 1)
        user.save()
      })
      res.status(202).json(noteBook.toJSON())
    })

  }
}
