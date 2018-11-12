const Product = require('../models/product');

module.exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

module.exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect('/');
};

module.exports.getAdminProducts = (req, res, next) => {
  return res.render('admin/products', {
    pageTitle: 'Products',
    path: '/admin/products'
  });
};
