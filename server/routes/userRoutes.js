const { Router } = require('express');
const { createUser, getAllUsers, updateUsername } = require('../controllers/users');
const { errorMessages, errorNames } = require('../middlewares/errorHandler');
const usersRouter = new Router();

usersRouter.post('/', async (req, res, next) => {
    const { name, username } = req.body;
    try {
        const createdUser = await createUser({ name, username });
        res.status(201).json(createUser)
    }
    catch(e) {
        if(e.name === errorNames.sequelizeValidationError) {
            next(e)
            return;
        }
        const createUserFailedError = new Error(errorMessages[errorNames.createUserFailed])
        createUserFailedError.name = errorNames.createUserFailed
        next(createUserFailedError)
    }
});

usersRouter.get('/', async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();
        res.status(200).json(allUsers)
    }
    catch(e) {
        const getUsersError = new Error(errorMessages[errorNames.getUsersFailed])
        getUsersError.name = errorNames.getUsersFailed
        next(getUsersError)
    }
});

usersRouter.put('/:username', async (req, res, next) => {
    try {
        const { username: newUsername } = req.body
        const updatedUser = await updateUsername(req.params.username, newUsername)
        res.status(204).json(updatedUser)
    }
    catch(e) {
        if(e.name === errorNames.sequelizeValidationError) {
            next(e);
            return;
        }
        const updateUserFailedError = new Error(errorMessages[errorNames.updateUserFailed])
        updateUserFailedError.name = errorNames.updateUserFailed
        next(updateUserFailedError)
    }
});

module.exports = usersRouter;