const Product = require('../models/product');
const Cart = require('../models/cart');

module.exports.getIndex = (req, res) => {
  Product.fetchAll().then(([rows]) =>
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    })
  );
};

module.exports.getCart = (req, res) => {
  Cart.getCart(cart => {
    Product.fetchAll().then(([rows]) => {
      const cartProducts = [];
      rows.forEach(product => {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({ ...product, qty: cartProductData.qty });
        }
      });
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        cartProducts
      });
    });
  });
};

module.exports.getAddToCart = (req, res) => {
  Product.fetchOne(Number(req.params.id), product => {
    if (product) {
      Cart.addProduct(product.id, product.price);
    }
    res.redirect('/cart');
  });
};

module.exports.getRemoveFromCart = (req, res) => {
  Product.fetchOne(+req.params.id, product => {
    if (product) {
      Cart.deleteProduct(product.id, product.price);
    }
    res.redirect('/cart');
  });
};

module.exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders'
  });
};

module.exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};

module.exports.getProducts = (req, res) => {
  Product.fetchAll().then(([rows]) =>
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'Products',
      path: '/products'
    })
  );
};

module.exports.getProductDetail = (req, res) => {
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
