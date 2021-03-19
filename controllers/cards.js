const Card = require('../models/card');

const getCards = (req, res) => {
	Card.find({})
		.then((cards) => res.status(200).send(cards))
		.catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
	const { name, link } = req.body;

	Card.create({ name, link, owner: req.user._id }).then((card) => res.status(201).send(card)).catch((err) => {
		if (err.name === 'ValidationError') {
			res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
		} else {
			res.status(500).send({ message: 'Произошла ошибка' });
		}
	});
};

const deleteCardById = (req, res) => {
	console.log('это работает?');
	console.log(req);

	Card.findByIdAndRemove(req.params.id)
		.then((card) => {
			if (!card) {
				return res.status(404).send({ message: 'Карточка не найдена' });
			}
			res.status(200).send({ message: 'Карточка удалена' });
		})
		.catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { getCards, createCard, deleteCardById };
