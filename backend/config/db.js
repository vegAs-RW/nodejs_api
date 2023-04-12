const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URI);
        console.log('mongo connecté');
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

module.exports = connectDb;