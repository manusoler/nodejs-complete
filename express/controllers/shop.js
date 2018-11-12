const Product = require('../models/product');

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll(products =>
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  );
};

module.exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    path: '/cart'
  });
};

module.exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll(products =>
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products',
      path: '/products'
    })
  );
};

module.exports.getProductDetail = (req, res, next) => {
  Product.fetchOne(Number(req.params.id), product => {
    if (product) {
      return res.render('shop/product-detail', {
        prod: product,
        pageTitle: 'Product Detail',
        path: '/product-detail'
      });
    }
    return res.redirect('/not-found');
  });
};
