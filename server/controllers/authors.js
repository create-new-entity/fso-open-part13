const { sequelize } = require("../configs");
const { Blog } = require("../models");


const getAuthors = async () => {
    const totalLikesOfAnAuthor = sequelize.fn('sum', sequelize.col('likes'));
    const blogCount = sequelize.fn('count', sequelize.col('id'));
    const orderByLikesDescending = [totalLikesOfAnAuthor, 'DESC'];
    const authors = await Blog.findAll({
        group: 'author',
        attributes: [
            'author',
            [blogCount, 'articles'],
            [totalLikesOfAnAuthor, 'likes']
        ],
        order: [orderByLikesDescending]
    });

    return authors.map(author => author.toJSON());
}

module.exports = {
    getAuthors
}