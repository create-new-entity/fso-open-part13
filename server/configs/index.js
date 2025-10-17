const { PORT, sequelize } = require("./config");
const connectDb = require("./connectDb");

module.exports = {
    PORT, sequelize, connectDb
}