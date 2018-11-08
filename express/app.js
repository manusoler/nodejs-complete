const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
  console.log('In the middleware!');
  res.send('<h1>Add product page</h1>');
});

app.use('/', (req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Hi from Express.js</h1>');
});

app.listen(3000);
