const { Sequelize } = require("sequelize");

const PORT = process.env.PORT;
const sequelize = new Sequelize(process.env.POSTGRESQL_URL);
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    PORT, sequelize, JWT_SECRET
};