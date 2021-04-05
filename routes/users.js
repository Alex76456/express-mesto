const router = require('express').Router();

//const auth = require('../middlewares/auth');

const {
	getUsers,
	getUserById,
	createUser,
	patchUser,
	patchUserAvatar,
	login,
	getMe
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUserById);
router.post('/signup', createUser);
router.post('/signin', login);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
