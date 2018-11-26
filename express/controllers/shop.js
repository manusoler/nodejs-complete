const Product = require('../models/product');
const Cart = require('../models/cart');

module.exports.getIndex = (req, res) => {
  Product.findAll().then(rows =>
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    })
  );
};

module.exports.getCart = (req, res) => {
  Cart.getCart(cart => {
    Product.findAll().then(rows => {
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
  Product.findByPk(Number(req.params.id))
    .then(product => {
      if (product) {
        Cart.addProduct(product.id, product.price);
      }
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

module.exports.getRemoveFromCart = (req, res) => {
  Product.findByPk(+req.params.id)
    .then(product => {
      if (product) {
        Cart.deleteProduct(product.id, product.price);
      }
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
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
  Product.findAll().then(rows =>
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'Products',
      path: '/products'
    })
  );
};

module.exports.getProductDetail = (req, res) => {
  Product.findByPk(Number(req.params.id))
    .then(product => {
      if (product) {
        return res.render('shop/product-detail', {
          prod: product,
          pageTitle: 'Product Detail',
          path: '/product-detail'
        });
      }
      return res.redirect('/not-found');
    })
    .catch(err => console.log(err));
};
