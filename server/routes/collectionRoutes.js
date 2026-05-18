const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Protect all collection routes

router.post('/', collectionController.createCollection);
router.get('/', collectionController.getCollections);
router.put('/:id', collectionController.updateCollection);
router.delete('/:id', collectionController.deleteCollection);

module.exports = router;
