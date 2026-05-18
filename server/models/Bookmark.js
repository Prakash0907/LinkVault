const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: false },
  url: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  image: { type: String },
  favicon: { type: String },
  tags: [{ type: String }],
  savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
