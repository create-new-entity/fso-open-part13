const { Token } = require("../models");


const deleteToken = async (userId) => {
    await Token.destroy({
        where: {
            userId
        }
    });
};

module.exports = {
    deleteToken
}