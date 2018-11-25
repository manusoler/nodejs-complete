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
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUE (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  update() {
    getProductsFromFile(products => {
      const newProds = products.map(elem => (elem.id === this.id ? this : elem));
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
    return db.execute('SELECT * FROM products WHERE id = ?', [id]);
  }
};
