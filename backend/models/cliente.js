const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
 
    identificacion: {
        type: String,
        require: true,
        unique: true
    },
    nombres: {
        type: String,
        require: true
    }, 
    apellidos: {
        type: String,
        require: true
    },
    departamento: {
        type: String,
        require: true
    },
    ciudad: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    },
    telefono: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true,
        unique: true
    }
}, {versionKey: false});

module.exports = mongoose.model('Cliente', clienteSchema);