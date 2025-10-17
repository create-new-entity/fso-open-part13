const { Router } = require('express');
const Blog = require('../models/Blog');

const blogsRouter = new Router();

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (req, res) => {
    const newBlog = req.body
    const createdBlog = await Blog.create(newBlog)
    res.json(createdBlog.toJSON())
});

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.destroy({
        where: {
            id: req.params.id
        }
    });
    res.end();
})

module.exports = blogsRouter