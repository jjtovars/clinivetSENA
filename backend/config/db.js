const mongoose = require('mongoose');
require('dotenv').config();

const conectarDB = () => {

    mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log('Conectados con Mongo'))
    .catch((err) => console.log(err));
}

module.exports = conectarDB