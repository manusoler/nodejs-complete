const Product = require('../models/product');
const Cart = require('../models/cart');

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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ ...product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        cartProducts
      });
    });
  });
};

module.exports.getAddToCart = (req, res, next) => {
  Product.fetchOne(Number(req.params.id), product => {
    if (product) {
      Cart.addProduct(product.id, product.price);
    }
    res.redirect('/cart');
  });
};

module.exports.getRemoveFromCart = (req, res, next) => {
  Product.fetchOne(+req.params.id, product => {
    if (product) {
      Cart.deleteProduct(product.id, product.price);
    }
    res.redirect('/cart');
  });
};

module.exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders'
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
