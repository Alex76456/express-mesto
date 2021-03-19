const User = require('../models/user');

const getUsers = (req, res) => {
	User.find({})
		.then((users) => res.status(200).send(users))
		.catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: 'Пользователь не найден' });
			}
			res.status(200).send(user);
		})
		.catch((err) => res.status(500).send({ message: err.message }));
};

const createUser = (req, res) => {
	const { name, about, avatar } = req.body;

	User.create({ name, about, avatar }).then((user) => res.status(201).send(user)).catch((err) => {
		if (err.name === 'ValidationError') {
			res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
		} else {
			res.status(500).send({ message: err.message });
		}
	});
};

module.exports = { getUsers, getUserById, createUser };
