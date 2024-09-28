const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  title: String,
  original_link: String,
  short_id: { type: String, unique: true },
  counter: { type: Number, default: 0 }
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
