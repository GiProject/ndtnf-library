import { model, Schema } from 'mongoose'
import { IBook } from '../interfaces/models/IBook'

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    default: "",
  },
  authors: {
    type: String,
    default: "",
  },
  favorite: {
    type: String,
    default: "",
  },
  fileCover: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: "",
  },
  fileBook: {
    type: String,
    default: "",
  },
})

export const Book = model('Book', bookSchema)