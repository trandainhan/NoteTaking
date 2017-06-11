import mongoose from 'mongoose'

const Schema = mongoose.Schema

// set up a mongoose model and pass it using module.exports
export default mongoose.model('Note', new Schema({
    title: String,
    content: String,
    noteBookId: String
}));
