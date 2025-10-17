const { sequelize } = require("./config");

const connectDb = async () => {
    try {
        await sequelize.authenticate()
        console.log('DB Connected.')
    } catch (error) {
        console.error('DB connection failed.', error)
    }
};

module.exports = connectDb