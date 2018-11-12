const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.get('/delete-product/:id', adminController.deleteProduct);
router.get('/edit-product/:id', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.get('/products', adminController.getAdminProducts);

router.post('/add-product', adminController.postAddProduct);

module.exports = router;
