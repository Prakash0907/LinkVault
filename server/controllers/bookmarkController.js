const Bookmark = require('../models/Bookmark');
const { fetchMetadata } = require('../services/metadataService');

exports.saveBookmark = async (req, res) => {
  const { url, collectionId } = req.body;
  try {
    const metadata = await fetchMetadata(url);
    const newBookmark = new Bookmark({
      userId: req.user.id,
      url,
      collectionId: collectionId || null,
      title: metadata.title,
      description: metadata.description,
      image: metadata.image,
      favicon: metadata.favicon
    });

    const bookmark = await newBookmark.save();
    res.json(bookmark);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    let query = { userId: req.user.id };
    if (req.query.collectionId) {
      query.collectionId = req.query.collectionId;
    }
    const bookmarks = await Bookmark.find(query).sort({ savedAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.searchBookmarks = async (req, res) => {
  try {
    const { q } = req.query;
    const bookmarks = await Bookmark.find({
      userId: req.user.id,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { url: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    }).sort({ savedAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.moveBookmark = async (req, res) => {
  try {
    let bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) return res.status(404).json({ msg: 'Bookmark not found' });
    if (bookmark.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    bookmark = await Bookmark.findByIdAndUpdate(req.params.id, { $set: { collectionId: req.body.collectionId } }, { new: true });
    res.json(bookmark);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) return res.status(404).json({ msg: 'Bookmark not found' });
    if (bookmark.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Bookmark removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
