import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('Note', new Schema({
    title: String,
    content: Schema.Types.Mixed,
    noteBookId: String
}));
