
const BLOG_NOT_FOUND = 'BlogNotFound';
const CREATE_USER_FAILED = 'CreateUserFailed';
const GET_USERS_FAILED = 'GetUsersFailed';
const UPDATE_USER_FAILED = 'UpdateUserFailed';
const SEQUELIZE_VALIDATION_ERROR = 'SequelizeValidationError';
const LOGIN_FAILED = 'LogInFailed';
const USER_NOT_FOUND = 'UserNotFound';
const INVALID_USERNAME_PASSWORD = 'InvalidCredentials';
const INVALID_TOKEN = 'InvalidToken';
const TOKEN_MISSING = 'TokenMissing';
const UNAUTHORIZED = 'Unauthorized';
const INVALID_YEAR = 'InvalidYear';
const USER_IS_DISABLED = 'UserIsDisabled';
const TOKEN_EXPIRED = 'TokenExpired';

const errorNames = {
    blogNotFound: BLOG_NOT_FOUND,
    createUserFailed: CREATE_USER_FAILED,
    getUsersFailed: GET_USERS_FAILED,
    updateUserFailed: UPDATE_USER_FAILED,
    sequelizeValidationError: SEQUELIZE_VALIDATION_ERROR,
    loginFailed: LOGIN_FAILED,
    userNotFound: USER_NOT_FOUND,
    invalidUsernameOrPassword: INVALID_USERNAME_PASSWORD,
    invalidToken: INVALID_TOKEN,
    tokenMissing: TOKEN_MISSING,
    unauthorized: UNAUTHORIZED,
    invalidYear: INVALID_YEAR,
    userIsDisabled: USER_IS_DISABLED,
    tokenExpired: TOKEN_EXPIRED
}

const getInvalidYearErrorMessage = (maxYear) => {
    return `Year should be within the range of 1991 and ${maxYear}`;
}

const errorMessages = {
    [BLOG_NOT_FOUND]: 'Blog not found.',
    [CREATE_USER_FAILED]: 'Failed to create user.',
    [GET_USERS_FAILED]: 'Failed to fetch users.',
    [UPDATE_USER_FAILED]: 'Failed to update user.',
    [USER_NOT_FOUND]: 'User not found.',
    [INVALID_USERNAME_PASSWORD]: 'Username or Password is wrong.',
    [INVALID_TOKEN]: 'Invalid token.',
    [TOKEN_MISSING]: 'Token is missing.',
    [UNAUTHORIZED]: 'User is not authorized to perform this action.',
    [USER_IS_DISABLED]: 'User is disabled. Please contact admin.',
    [TOKEN_EXPIRED]: 'Token expired. Please login again.'
}

const errorHandler = (error, req, res, next) => {
    if(error.name === errorNames.blogNotFound) {
        res.status(404).send({ error: error.message });
    }
    else if(error.name === errorNames.sequelizeValidationError || error.name === errorNames.invalidYear) {
        res.status(400).send({ error: error.message });
    }
    else if(error.name === errorNames.loginFailed || error.name === errorNames.unauthorized || error.name === errorNames.userIsDisabled || error.name === errorNames.tokenExpired) {
        res.status(401).send({ error: error.message });
    }
    else {
        res.status(500).send({ error: 'Unknown error.' });
    }
    next(error)
};

module.exports = {
    errorNames,
    errorMessages,
    errorHandler,
    getInvalidYearErrorMessage
}