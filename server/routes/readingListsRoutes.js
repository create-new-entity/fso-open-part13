const { Router } = require('express');
const { addToReadingList, updateRead } = require('../controllers/users');
const tokenExtractor = require('../middlewares/authentication');

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

readingListRouter.put('/:id', tokenExtractor, async (req, res, next) => {
    try {
        const { username, id } = req.decodedToken
        const { read } = req.body
        await updateRead(req.params.id, id, read);
        res.status(204).end();
    }
    catch(e) {
        next(e)
    }
});

module.exports = readingListRouter;