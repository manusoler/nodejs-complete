const fs = require('fs');
const path = require('path');

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
      product = products.find(elem => elem.id === parseInt(id, 10));
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

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchOne(id, cb) {
    getProductFromFile(id, cb);
  }
};
