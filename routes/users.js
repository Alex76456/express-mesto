const router = require('express').Router();

const validator = require('validator');
const { celebrate, Joi, CelebrateError } = require('celebrate');
const auth = require('../middlewares/auth');

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((url) => {
      if (!validator.isURL(url)) {
        throw new CelebrateError('Неверный URL');
      }
      return url;
    }),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
});

const validateUserPatch = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) {
        throw new CelebrateError('Неверный URL');
      }
      return url;
    }),
  }),
});

const {
  getUsers,
  getUserById,
  createUser,
  patchUser,
  patchUserAvatar,
  login,
  getMe,
} = require('../controllers/users');

router.post('/signup', validateUserSignup, createUser);
router.post('/signin', validateUserLogin, login);

router.use(auth);
router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', validateId, getUserById);
router.patch('/me', validateUserPatch, patchUser);
router.patch('/me/avatar', validateUserAvatar, patchUserAvatar);

module.exports = router;
