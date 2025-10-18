const { User, Blog } = require("../models");


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

module.exports = {
    createUser,
    getAllUsers,
    updateUsername
}