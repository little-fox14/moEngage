const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  name: { type: String, required: true },
  responseCodes: [Number],
  imageLinks: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('List', ListSchema);
