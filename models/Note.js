class Note {
  constructor(data) {
    data = data || {}
    this.id = data.id
    this.title = data.title
    this.createdDate = data.createdDate
    this.content = data.content
  }
}
