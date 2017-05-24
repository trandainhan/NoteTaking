class NoteBook {
  constructor(data) {
    data = data || {}
    this.id = data.id
    this.title = data.title
    this.notes = data.notes
  }
}
