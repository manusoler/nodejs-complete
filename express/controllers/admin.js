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
  product
    .save()
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};

module.exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) =>
      res.render('admin/products', {
        prods: rows,
        pageTitle: 'Products',
        path: '/admin/products'
      })
    )
    .catch(err => console.log(err));
};

module.exports.deleteProduct = (req, res, next) => {
  const product = new Product();
  product.id = Number(req.params.id);
  product.delete();
  res.redirect('/admin/products');
};

module.exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.id = Number(id);
  product.update();
  res.redirect('/admin/products');
};

module.exports.getEditProduct = (req, res, next) => {
  Product.fetchOne(Number(req.params.id))
    .then(([[product]]) => {
      if (product) {
        return res.render('admin/edit-product', {
          product,
          pageTitle: 'Edit Product',
          path: '/admin/edit-product'
        });
      }
      return res.redirect('/not-found');
    })
    .catch(err => console.log(err));
};
