const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
	getCards,
	createCard,
	deleteCardById,
	putLike,
	deleteLike
} = require('../controllers/cards');

router.use(auth);
router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
