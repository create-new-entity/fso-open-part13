const { JWT_SECRET } = require("../configs/config");
const { errorMessages, errorNames } = require("../middlewares/errorHandler");
const { User } = require("../models");
const jwt = require('jsonwebtoken');


const login = async (username, password) => {
    let user = await User.findOne({
        where: {
            username
        }
    })
    if(!user) {
        const loginFailedError = new Error(errorMessages[errorNames.userNotFound]);
        loginFailedError.name = errorNames.loginFailed
        throw loginFailedError;
    }
    user = user.toJSON();
    const isValidUsernameAndPassword = user && password === 'password';
    if(!isValidUsernameAndPassword) {
        const loginFailedError = new Error(errorMessages[errorNames.invalidUsernameOrPassword]);
        loginFailedError.name = errorNames.loginFailed;
        throw loginFailedError;
    }

    const userForToken = { username, id: user.id }
    const token = jwt.sign(userForToken, JWT_SECRET)

    return { token, username, name: user.name };
};

module.exports = {
    login
}