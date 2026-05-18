const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Protect all bookmark routes

router.get('/search', bookmarkController.searchBookmarks);
router.post('/', bookmarkController.saveBookmark);
router.get('/', bookmarkController.getBookmarks);
router.put('/:id', bookmarkController.moveBookmark);
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;
