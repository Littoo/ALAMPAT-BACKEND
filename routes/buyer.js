const express = require('express');
const router = express.Router();

const buyerController = require('../controllers/BuyerController');

router.post(':id/addtoCart/', buyerController.addtoCart)

router.get(':id/getCart/', buyerController.getCartItems)

router.delete(':id/removeCartitem/', buyerController.deleteCartitem)

module.exports = router;