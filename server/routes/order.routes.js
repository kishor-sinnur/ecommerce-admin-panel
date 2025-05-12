const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/order.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, orderCtrl.getAllOrders);

module.exports = router;
