const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({

    codigo: {
        type: String,
        required: true,
        unique: true
    },
    categoria: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    }
}, {versionKey: false});

module.exports = mongoose.model('producto', productoSchema);

mongoose.model('Producto', productoSchema);