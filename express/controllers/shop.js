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
  req.user.getCart()
    .then(cart => cart.getProducts())
    .then(products =>
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        cartProducts: products
      })
    )
    .catch(err => console.log(err));
};

module.exports.getAddToCart = (req, res) => {
  const prodId = +req.params.id;
  let fetchCart;
  req.user.getCart()
    .then(cart => {
      fetchCart = cart;
      return cart.getProducts({ where: { id: prodId } })
    }
    ).then(products => {
      let product = products.length ? products[0] : null;
      let newQuantity = product ? (product.cartItem.quantity + 1) : 1;

      return Product.findByPk(prodId).then(
        product => {
          return fetchCart.addProduct(product, { through: { quantity: newQuantity } })
        }
      ).catch(err => console.log(err));

    }).then(() => res.redirect('/cart'))
    .catch(err => console.log(err));

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
  const prodId = +req.params.id;
  req.user.getCart()
  .then(cart => cart.getProducts({where: {id: prodId}}))
  .then(products => {
    const product = products.length ? products[0] : null;
    return product.cartItem.destroy();
  })
  .then(() => res.redirect('/cart'))
  .catch(err => console.log(err))
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
