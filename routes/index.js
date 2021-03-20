const userRouter = require('./users');
const cardRouter = require('./cards');

const router = require('express').Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
