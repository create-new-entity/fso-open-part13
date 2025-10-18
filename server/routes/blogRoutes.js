const { Router } = require('express');
const { getAllBlogs, createNewBlog, deleteBlog, updateBlog } = require('../controllers/blogs');
const { validateBlogId } = require('../middlewares/blogMiddlewares');

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

blogsRouter.delete('/:id', validateBlogId,  async (req, res, next) => {
    try {
        deleteBlog(req.params.id);
        res.end();
    }
    catch(e) {
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