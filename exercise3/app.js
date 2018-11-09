const express = require('express');
const path = require('path');
const appRouter = require('./routes/router');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', appRouter);

app.listen(3001);
