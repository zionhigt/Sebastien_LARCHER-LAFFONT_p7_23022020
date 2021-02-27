const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comments');

router.get('/:id', auth, commentCtrl.getCommentsByPostId);
router.post('/', auth, commentCtrl.postComment);


module.exports = router;