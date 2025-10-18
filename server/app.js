const express = require('express');
const cors = require('cors');
const blogsRouter = require('./routes/blogRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const usersRouter = require('./routes/userRoutes');

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(errorHandler)

module.exports = app;