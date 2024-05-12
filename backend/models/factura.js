const mongoose = require('mongoose');

const facturaSchema = mongoose.Schema({
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }],
    total: {
        type: Number,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Factura', facturaSchema);
