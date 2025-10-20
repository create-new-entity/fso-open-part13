const { Router } = require('express');
const { addToReadingList } = require('../controllers/users');

const readingListRouter = new Router();

readingListRouter.post('/', async (req, res, next) => {
    try {
        const createdToRead = await addToReadingList(req.body)
        res.status(201).json(createdToRead);
    }
    catch(e) {
        console.log('e', e.message)
        next(e)
    }

});

module.exports = readingListRouter;