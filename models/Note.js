import { uniqueId } from 'lodash/fp'
import { convertToRaw, ContentState } from 'draft-js'
import { formatDate } from '../utils/DateUtils'

class Note {
  constructor(data) {
    data = data || {}
    this.id = data.id || uniqueId('note_')
    this.title = data.title || ''
    this.createdDate = data.createdDate || formatDate(new Date())
    this.content = data.content || convertToRaw(ContentState.createFromText('')),
    this.noteBookId = data.noteBookId || ''
  }
}

export default Note
