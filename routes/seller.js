const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const portfolioController = require('../controllers/PortfolioController');
const OrderController = require('../controllers/OrderController');

router.post('/:id/addportfolio', portfolioController.addArtwork)
router.get('/:id/portfolio', portfolioController.getArtworkList)
router.patch('/:id/editportfolio/:artid', portfolioController.updateArtwork)
router.delete('/:id/removeportfolio/', portfolioController.deleteArtwork)
router.get('/portfolio/:id', portfolioController.getArtByID)

router.patch('/updateOrder/:order_id', OrderController.updateOrder)

module.exports = router;