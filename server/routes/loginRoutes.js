const { Router } = require('express');
const { login } = require('../controllers/login');
const loginRouter = new Router();

loginRouter.post('/', async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const loggedInData = await login(username, password)
        res.status(200).json(loggedInData)
    }
    catch(e) {
        next(e)
    }
});


module.exports = loginRouter;