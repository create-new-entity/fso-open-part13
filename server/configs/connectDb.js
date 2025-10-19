const { sequelize } = require("./config");
const { runMigrations } = require("./db");

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connected.');
        await runMigrations();
    } catch (error) {
        console.error('DB connection failed.', error)
        return process.exit(1)
    }
};

module.exports = connectDb