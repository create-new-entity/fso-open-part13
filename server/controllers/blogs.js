const { errorMessages, errorNames } = require("../middlewares/errorHandler");
const { Blog } = require("../models");

const getBlog = async (blogId) => {
    const blog = await Blog.findByPk(blogId);
    return blog.toJSON();
};

const getAllBlogs = async () => {
    const blogs = await Blog.findAll();
    return blogs.map(blog => blog.toJSON());
};

const createNewBlog = async (newBlog) => {
    const createdBlog = await Blog.create(newBlog);
    return createdBlog.toJSON();
};

const deleteBlog = async (id, userId) => {
    const deletedCount = await Blog.destroy({
        where: { id, userId }
    });
    if(deletedCount === 0) {
        const userNotAuthorizedError = new Error(errorMessages[errorNames.unauthorized])
        userNotAuthorizedError.name = errorNames.unauthorized
        throw userNotAuthorizedError;
    }
}

const updateBlog = async (id, updateFields) => {
    const [updatedCount, updatedBlog] = await Blog.update(updateFields, { where: { id }, returning: true, plain: true })
    if (!updatedBlog) {
        throw new Error('Blog not found')
    }
    return updatedBlog.toJSON();
}

module.exports = {
    getAllBlogs,
    createNewBlog,
    deleteBlog,
    getBlog,
    updateBlog
}