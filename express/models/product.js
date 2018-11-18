const db = require('../util/database');

const Cart = require('./cart');

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

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static fetchOne(id) {
    db.execute('SELECT * FROM products WHERE id = ?');
  }
};
