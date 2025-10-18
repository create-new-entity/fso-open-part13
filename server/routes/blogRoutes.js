const { Router } = require('express');
const { getAllBlogs, createNewBlog, deleteBlog, updateBlog } = require('../controllers/blogs');
const { validateBlogId } = require('../middlewares/blogMiddlewares');
const { tokenExtractor } = require('../middlewares');
const { User, Blog } = require('../models');

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

blogsRouter.post('/', tokenExtractor,async (req, res, next) => {
    try {

        const user = await User.findByPk(req.decodedToken.id)
        const newBlog = {...req.body, userId: user.id, date: new Date()};
        const createdBlog = await createNewBlog(newBlog)
        res.json(createdBlog)
    }
    catch(e) {
        next(e)
    }
});

blogsRouter.delete('/:id', tokenExtractor, validateBlogId,  async (req, res, next) => {
    try {
        await deleteBlog(req.params.id, req.decodedToken.id);
        res.status(200).end();
    }
    catch(e) {
        console.log('e', e.name, e.message)
        next(e);
    }
    
})

blogsRouter.put('/:id', validateBlogId, async (req, res, next) => {
    try {
        const updatedBlog = await updateBlog(req.params.id, req.body)
        res.json(updatedBlog);
    }
    catch(e) {
        next(e);
    }
});

module.exports = blogsRouter