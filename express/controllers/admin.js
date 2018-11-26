const Product = require('../models/product');

module.exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

module.exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  req.user
    .createProduct({
      description,
      title,
      imageUrl,
      price
    })
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};

module.exports.getAdminProducts = (req, res, next) => {
  Product.findAll()
    .then(rows =>
      res.render('admin/products', {
        prods: rows,
        pageTitle: 'Products',
        path: '/admin/products'
      })
    )
    .catch(err => console.log(err));
};

module.exports.deleteProduct = (req, res, next) => {
  req.user
    .getProducts({ where: { id: +req.params.id } })
    // Product.findByPk(+req.params.id)
    .then(product => product.destroy())
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};

module.exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, description, price } = req.body;
  req.user
    .getProducts({ where: { id: +id } })
    // Product.findByPk(+id)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;
      return product.save();
    })
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};

module.exports.getEditProduct = (req, res, next) => {
  req.user
    .getProducts({ where: { id: +req.params.id } })
    // Product.findByPk(Number(req.params.id))
    .then(product => {
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
