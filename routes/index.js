const router = require('express').Router();
//const auth = require('../middlewares/auth');
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
