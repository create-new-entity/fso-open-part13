
const BLOG_NOT_FOUND = 'BlogNotFound';

const errorNames = {
    blogNotFound: BLOG_NOT_FOUND
}

const errorMessages = {
    [BLOG_NOT_FOUND]: 'Blog not found.'
}

const errorHandler = (error, req, res, next) => {
    if(error.name === errorNames.blogNotFound) {
        res.status(404).send({ error: error.message })
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