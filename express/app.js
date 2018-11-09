const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorsController = require('./controllers/errors');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Erros (404)
app.use(errorsController.notFound);

app.listen(3000);
