const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }

  static addProduct(id, productPrize) {
    // Fetch the previos cart
    fs.readFile(p, (err, data) => {
      let cart = new Cart();
      if (!err) {
        cart = JSON.parse(data);
      }
      // analyze the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products.push(updatedProduct);
      }
      cart.totalPrice = cart.totalPrice + Number(productPrize);
      fs.writeFile(p, JSON.stringify(cart), err => {});
    });
  }

  addProduct(product) {
    this.products.push(product);
  }
};
