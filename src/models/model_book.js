import mongoose from 'mongoose'
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title:{ type:String,  trim: true},
    author:{type:String,  trim: true},
    description:{type:String, trim: true},
    date:{type: Date, default:Date.now()},
    image:{type:String }
})

const Book = mongoose.model('Book', bookSchema)
export {Book}