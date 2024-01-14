const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
  fileId: String,
  fileName: String,
  uploadDate: { type: Date, default: Date.now },
  content: Buffer,
})

module.exports = mongoose.model('File', FileSchema)
