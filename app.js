const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const path = require('path');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
  req.user = {
    _id: '6054ea585885740a5cba70ed',
  };
  next();
});

app.use(router);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
