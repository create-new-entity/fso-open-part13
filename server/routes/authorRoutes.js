const { Router } = require('express');
const { getAuthors } = require('../controllers/authors');
const authorRoutes = new Router();

authorRoutes.get('/', async (req, res, next) => {
    try {
        const authors = await getAuthors();
        res.status(200).json(authors)
    }
    catch(e) {
        next(e)
    }
});

module.exports = authorRoutes;