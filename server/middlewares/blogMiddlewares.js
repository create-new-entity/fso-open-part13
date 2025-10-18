const { getBlog } = require("../controllers/blogs");
const { Blog } = require("../models");
const { errorNames, errorMessages } = require("./errorHandler");

const extractBlog = async (req, res, next) => {
    try {
        const blog = await getBlog(req.params.id)
        req.blog = blog;
        next()
    }
    catch(e) {
        next(e)
    }
};

const validateBlogId = async (req, res, next) => {
    try {
        const foundBlog = await Blog.findByPk(req.params.id)
        if(!foundBlog) {
            const blogNotFoundError = new Error(errorMessages[errorNames.blogNotFound]);
            blogNotFoundError.name = errorNames.blogNotFound;
            throw blogNotFoundError
        }
        next();
    }
    catch(e) {
        next(e)
    }
}

module.exports = {
    extractBlog,
    validateBlogId
}