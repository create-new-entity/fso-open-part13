require('dotenv').config();

const { PORT, connectDb } = require('./configs');

connectDb();

const app = require('./app');


const startServer = async () => {

    const server = app.listen(PORT, (err) => {
        if(err) {
            console.log('Server failed to start at ', PORT);
            return;
        }
        console.log('Server listening at ', PORT)
    });

    const shutdown = async () => {
        console.log("Shut down cleanly.");
        await sequelize.close(); // close all DB connections
        server.close(() => {
            process.exit(0); // Gracefully shut down.
        });
    };

    process.on("SIGINT", shutdown);  // User hits ctl c
    process.on("SIGTERM", shutdown); // Something went wrong. Needs to shut down.
}

startServer()