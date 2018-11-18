const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);
const getProductsFromFile = cb => {
  fs.readFile(p, (err, data) => {
    let products = [];
    if (!err) {
      products = JSON.parse(data);
    }
    cb(products);
  });
};

const getProductFromFile = (id, cb) => {
  fs.readFile(p, (err, data) => {
    let product = null;
    if (!err) {
      const products = JSON.parse(data);
      product = products.find(elem => elem.id === id);
    }
    cb(product);
  });
};

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.id = null;
    this.imageUrl = imageUrl;
    this.title = title;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile(products => {
      // Fetch last id from file
      this.id = 1;
      if (products.length) {
        this.id = products[products.length - 1].id + 1;
      }
      // add this product to file
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), () => {});
    });
  }

  update() {
    getProductsFromFile(products => {
      const newProds = products.map(elem =>
        elem.id === this.id ? this : elem
      );
      fs.writeFile(p, JSON.stringify(newProds), () => {});
    });
  }

  delete() {
    getProductsFromFile(products => {
      const product = products.find(elem => elem.id === this.id);

      const newProds = products.filter(elem => elem.id !== this.id);
      fs.writeFile(p, JSON.stringify(newProds), error => {
        if (!error) {
          Cart.deleteProduct(product.id, product.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchOne(id, cb) {
    getProductFromFile(id, cb);
  }
};
