const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const userCtrl = require('../controllers/user');

router.get('/', auth, userCtrl.getConnected);


module.exports = router;