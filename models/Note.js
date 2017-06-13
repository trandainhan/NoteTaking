import { uniqueId } from 'lodash/fp'
import { convertToRaw, ContentState } from 'draft-js'

class Note {
  constructor(data) {
    data = data || {}
    this.id = data.id || uniqueId('note_')
    this.title = data.title || ''
    this.createdDate = data.createdDate || new Date().toString()
    this.content = data.content || convertToRaw(ContentState.createFromText('')),
    this.noteBookId = data.noteBookId || ''
  }
}

export default Note
