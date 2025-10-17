const { Sequelize } = require("sequelize");

const PORT = process.env.PORT;
const sequelize = new Sequelize(process.env.POSTGRESQL_URL)

module.exports = {
    PORT, sequelize
};