require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.POSTGRESQL_URL)

const { PORT } = require('./config');
const app = require('./app');

const connectDB = async () => {
     try {
        await sequelize.authenticate()
        console.log('DB Connected.')
        const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
        
        blogs.forEach((blog) => {
            console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`)
        })

        sequelize.close()
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