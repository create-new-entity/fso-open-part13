
const BLOG_NOT_FOUND = 'BlogNotFound';
const CREATE_USER_FAILED = 'CreateUserFailed';
const GET_USERS_FAILED = 'GetUsersFailed';
const UPDATE_USER_FAILED = 'UpdateUserFailed';
const SEQUELIZE_VALIDATION_ERROR = 'SequelizeValidationError';

const errorNames = {
    blogNotFound: BLOG_NOT_FOUND,
    createUserFailed: CREATE_USER_FAILED,
    getUsersFailed: GET_USERS_FAILED,
    updateUserFailed: UPDATE_USER_FAILED,
    sequelizeValidationError: SEQUELIZE_VALIDATION_ERROR
}

const errorMessages = {
    [BLOG_NOT_FOUND]: 'Blog not found.',
    [CREATE_USER_FAILED]: 'Failed to create user.',
    [GET_USERS_FAILED]: 'Failed to fetch users.',
    [UPDATE_USER_FAILED]: 'Failed to update user.'
}

const errorHandler = (error, req, res, next) => {
    if(error.name === errorNames.blogNotFound) {
        res.status(404).send({ error: error.message });
    }
    else if(error.name === errorNames.sequelizeValidationError) {
        res.status(400).send({ error: error.message });
    }
    else {
        res.status(500).send({ error: 'Unknown error.' });
    }
    next(error)
};

module.exports = {
    errorNames,
    errorMessages,
    errorHandler
}