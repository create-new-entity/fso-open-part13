const { Blog } = require("../models");

const getAllBlogs = async () => {
    const blogs = await Blog.findAll();
    return blogs.map(blog => blog.toJSON());
};

const createNewBlog = async (newBlog) => {
    const createdBlog = await Blog.create(newBlog);
    return createdBlog.toJSON();
};

const deleteBlog = async (id) => {
    await Blog.destroy({
        where: { id }
    });
}

module.exports = {
    getAllBlogs,
    createNewBlog,
    deleteBlog
}