const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
  console.log('In users middleware!!');
  res.send('<h1>Users page</h1>');
});

app.use('/', (req, res, next) => {
  console.log('In root middleware!!');
  res.send('<h1>Welcome to the main page</h1>');
});

app.listen(3000);
