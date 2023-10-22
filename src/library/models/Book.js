const {Schema, model} = require('mongoose')

const BookSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String,
    required: true,
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
  }
});

module.exports = model("Book", BookSchema);