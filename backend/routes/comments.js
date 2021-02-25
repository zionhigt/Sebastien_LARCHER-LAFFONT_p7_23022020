const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comments');

router.get('/:id', commentCtrl.getCommentsByPostId);


module.exports = router;