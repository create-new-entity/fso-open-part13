const { where } = require("sequelize");
const { User, Blog } = require("../models");
const Reading = require("../models/Reading");


const createUser = async (newUser) => {
    const createdUser = await User.create(newUser);
    return createdUser.toJSON();
};

const getAllUsers = async () => {
    const allUsers = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
    });
    return allUsers.map(user => user.toJSON());
};

const getUser = async (userId) => {
    const foundUser = await User.findOne({
        where: {
            id: userId
        },
        attributes: ['name', 'username'],
        include: [
            {
                model: Blog,
                as: 'readings',
                attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
                through: {
                    attributes: ['read', 'id']
                }
            }
        ]
    })
    return foundUser.toJSON();
}

const updateUsername = async (currentUsername, newUsername) => {
    const [_, updatedUser] = await User.update(
        { username: newUsername },
        {
            where: {
                username: currentUsername,
            },
            returning: true, plain: true
        },
    );
    return updatedUser;
};

const addToReadingList = async ({ blogId, userId }) => {
    const newToRead = {
        blogId, userId, read: false
    }
    const createdNewToRead = await Reading.create(newToRead);
    return createdNewToRead.toJSON();
};

const updateRead = async (readListId, userId, read) => {
    await Reading.update(
        { read },
        {
            where: {
                id: readListId,
                userId
            }
        }
    );
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUsername,
    addToReadingList,
    updateRead
}