const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const path = require('path');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

const NotFoundError = require('./middlewares/errors/NotFoundError');

mongoose.connect('mongodb://localhost:27017/mestodb', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')))

app.use(router);

app.use('*', () => {
	throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use((err, req, res, next) => {
	// если у ошибки нет статуса, выставляем 500
	const { statusCode = 500, message } = err;

	res.status(statusCode).send({
		// проверяем статус и выставляем сообщение в зависимости от него
		message: statusCode === 500 ? 'На сервере произошла ошибка' : message
	});
});

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
