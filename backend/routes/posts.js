const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

const postsCtrl = require('../controllers/posts');

router.get('/', auth, postsCtrl.getAll);
router.get('/:id', auth, postsCtrl.getOne);
router.put('/:id', auth, multer, postsCtrl.updateOne);
router.delete('/:id', auth, postsCtrl.deleteOne);
router.post('/', auth, multer, postsCtrl.posting);
router.post('/like/:id', auth, postsCtrl.likeHandler);


module.exports = router;