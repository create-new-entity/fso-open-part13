const { Router } = require('express');
const Blog = require('../models/Blog');
const { getAllBlogs, createNewBlog, deleteBlog } = require('../controllers/blogs');

const blogsRouter = new Router();

blogsRouter.get('/', async (req, res, next) => {
    try {
        const allBlogs = await getAllBlogs();
        res.json(allBlogs);
    }
    catch(e) {
        next(e)
    }
});

blogsRouter.post('/', async (req, res, next) => {
    try {
        const createdBlog = await createNewBlog(req.body)
        res.json(createdBlog)
    }
    catch(e) {
        next(e)
    }
});

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        deleteBlog(req.params.id);
        res.end();
    }
    catch(e) {
        next(e);
    }
    
})

module.exports = blogsRouter