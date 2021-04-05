const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = (req, res) => {
	User.find({})
		.then((users) => res.status(200).send(users))
		.catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getMe = (req, res) => {
	console.log(req.user._id);
	User.findById(req.user._id)
		.then((user) => {
			if (!user) {
				return res
					.status(404)
					.send({ message: 'Пользователь по указанному _id не найден.' });
			}
			return res.status(200).send(user);
		})
		.catch((err) => {
			if (err.name === 'CastError') {
				res.status(400).send({ message: 'ошибка валидации userID' });
			} else {
				res.status(500).send({ message: 'Произошла ошибка' });
			}
		});
};

const getUserById = (req, res) => {
	User.findById(req.params.userId)
		.then((user) => {
			if (!user) {
				return res
					.status(404)
					.send({ message: 'Пользователь по указанному _id не найден.' });
			}
			return res.status(200).send(user);
		})
		.catch((err) => {
			if (err.name === 'CastError') {
				res.status(400).send({ message: 'ошибка валидации userID' });
			} else {
				res.status(500).send({ message: 'Произошла ошибка' });
			}
		});
};

const createUser = (req, res) => {
	const { name, about, avatar, email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send({ message: 'email или пароль не должен быть пустым' });
	}

	bcrypt
		.hash(password, 10)
		.then((hash) =>
			User.create({
				name,
				about,
				avatar,
				email,
				password: hash
			})
		)
		.then((user) => res.status(201).send(user))
		.catch((err) => {
			console.log(err.name);
			if (err.name === 'ValidationError') {
				res.status(400).send({ message: 'ошибка валидации данных' });
			} else if (err.name === 'MongoError') {
				res.status(403).send({ message: 'пользователь уже существует' });
			} else {
				res.status(500).send({ message: 'Произошла ошибка' });
			}
		});
};

const login = (req, res) => {
	const { email, password } = req.body;

	return User.findUserByCredentials(email, password)
		.then((user) => {
			res.send({
				token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' })
			});
		})
		.catch(() => {
			res.status(401).send({ message: 'Почта или пароль неверны' });
		});
};

const patchUser = (req, res) => {
	const { name, about } = req.body;
	User.findByIdAndUpdate(
		req.user._id,
		{ name, about },
		{
			new: true, // обработчик then получит на вход обновлённую запись
			runValidators: true // данные будут валидированы перед изменением
		}
	)
		.then((user) => {
			if (!user) {
				return res
					.status(404)
					.send({ message: 'Пользователь по указанному _id не найден.' });
			}

			return res.status(200).send(user);
		})
		.catch((err) => {
			if (err.name === 'CastError' || err.name === 'ValidationError') {
				res.status(400).send({ message: 'ошибка валидации данных' });
			} else {
				res.status(500).send({ message: 'Произошла ошибка' });
			}
		});
};

const patchUserAvatar = (req, res) => {
	const { avatar } = req.body;

	User.findByIdAndUpdate(
		req.user._id,
		{ avatar },
		{
			new: true,
			runValidators: true
		}
	)
		.then((user) => {
			if (!user) {
				return res
					.status(404)
					.send({ message: 'Пользователь по указанному _id не найден.' });
			}
			return res.status(200).send(user);
		})
		.catch((err) => {
			if (err.name === 'ValidationError') {
				res.status(400).send({ message: 'ошибка валидации данных' });
			} else {
				res.status(500).send({ message: 'Произошла ошибка' });
			}
		});
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	patchUser,
	patchUserAvatar,
	login,
	getMe
};
