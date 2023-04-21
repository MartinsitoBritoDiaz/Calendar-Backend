const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CONNECTION_STRING);

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error while initializing database');
    }
}

module.exports = {
    dbConnection,
}