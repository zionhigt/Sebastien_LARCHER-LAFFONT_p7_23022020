const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comments');

router.get('/:id', auth, commentCtrl.getCommentsByPostId);
router.post('/', auth, commentCtrl.postComment);
router.delete('/:id', auth, commentCtrl.deleteOne);
router.put('/:id', auth, commentCtrl.updateOne);
router.post('/like/:id', auth, commentCtrl.likeHandler);



module.exports = router;