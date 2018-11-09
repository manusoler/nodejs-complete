module.exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

module.exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
};

module.exports.getProducts = (req, res, next) => {
  res.render('shop', {
    prods: [{ title: 'A book' }],
    pageTitle: 'Shop',
    path: '/'
  });
};
