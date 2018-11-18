const path = require('path');
const express = require('express');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/add-to-cart/:id', shopController.getAddToCart);
router.get('/remove-from-cart/:id', shopController.getRemoveFromCart);
router.get('/cart', shopController.getCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);
router.get('/product-detail/:id', shopController.getProductDetail);

module.exports = router;
