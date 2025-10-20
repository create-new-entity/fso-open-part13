const { Router } = require('express');
const { deleteToken } = require('../controllers/logout');
const { tokenExtractor } = require('../middlewares');
const logoutRouter = new Router();

logoutRouter.delete('/', tokenExtractor, async (req, res, next) => {
    try {
        const { id: userId } = req.decodedToken
        await deleteToken(userId)
        res.status(204).end();
    }
    catch(e) {
        next(e)
    }
});

module.exports = logoutRouter;