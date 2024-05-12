const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({

    correoUsuario: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('usuario', usuarioSchema);