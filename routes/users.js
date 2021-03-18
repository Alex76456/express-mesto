const router = require('express').Router();
const { getFilms, createFilm } = require('../controllers/films');

router.get('/users', getFilms);
router.get('/users/:userId', createFilm);
router.post('/users', createFilm);

module.exports = router;
