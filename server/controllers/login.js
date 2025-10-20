const { JWT_SECRET } = require("../configs/config");
const { errorMessages, errorNames } = require("../middlewares/errorHandler");
const { User, Token } = require("../models");
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
    if(user.disabled) {
        const loginFailedError = new Error(errorMessages[errorNames.userIsDisabled]);
        loginFailedError.name = errorNames.userIsDisabled
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

    const newToken = {
        token,
        userId: user.id
    }

    await Token.create(newToken)

    return { token, username, name: user.name };
};

const isTokenValid = async (userId, incomingToken) => {
    const foundToken = await Token.findOne({
        where: {
            userId,
            token: incomingToken
        }
    });

    if (!foundToken) {
        const tokenExpiredError = new Error(errorMessages[errorNames.tokenExpired]);
        tokenExpiredError.name = errorNames.tokenExpired
        throw tokenExpiredError;
    }
}

module.exports = {
    login, isTokenValid
}