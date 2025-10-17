require('dotenv').config();
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.POSTGRESQL_URL)

const { PORT } = require('./config');
const app = require('./app');

const connectDB = async () => {
     try {
        await sequelize.authenticate()
        console.log('DB Connected.')
        sequelize.close()
    } catch (error) {
        console.error('DB connection failed.', error)
    }
};

connectDB();

app.listen(PORT, (err) => {
    if(err) {
        console.log('Server failed to start at ', PORT);
        return;
    }
    console.log('Server listening at ', PORT)
});