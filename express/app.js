const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorsController = require('./controllers/errors');
const sequelize = require('./util/database');

// Sequelize Models
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
// Add user to request
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
    })
    .catch(err => console.log(err))
    .finally(() => next());
});

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Erros (404)
app.use(errorsController.notFound);

// Create database model
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
sequelize
  .sync({ force: true })
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(() => app.listen(3000))
  .catch(err => console.log(err));
