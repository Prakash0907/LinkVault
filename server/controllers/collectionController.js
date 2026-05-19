const Collection = require('../models/Collection');
const Bookmark = require('../models/Bookmark');

exports.createCollection = async (req, res) => {
  try {
    const newCollection = new Collection({
      userId: req.user.id,
      name: req.body.name
    });
    const collection = await newCollection.save();
    res.json(collection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(collections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateCollection = async (req, res) => {
  try {
    let collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ msg: 'Collection not found' });
    if (collection.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    collection = await Collection.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } }, { new: true });
    res.json(collection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ msg: 'Collection not found' });
    if (collection.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    // Cascade delete all bookmarks in this collection
    await Bookmark.deleteMany({ collectionId: req.params.id });

    await Collection.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Collection removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
