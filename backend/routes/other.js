const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getConnected);


module.exports = router;