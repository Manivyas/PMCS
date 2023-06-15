const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  filename: {
    type: String,
  },
  fileId: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: String,
  },
  description: {
    type: String,
  },
  path: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  comments:{
    type:Array,
    default:[]
  }
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
