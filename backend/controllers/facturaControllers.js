const Factura = require('../models/factura');
const totalFactura = require('../funciones/calcTotalFactura');

// Método POST para agregar una factura
exports.agregarFactura = async (req, res) => {
    try {
        // Obtener los IDs de los productos de la solicitud
        const productosIds = req.body.productos;

        // Calcular el total de la factura
        const { total, productosDetalles } = await totalFactura(productosIds);

        // Crear la factura con los productos y el total
        const nuevaFactura = new Factura({
            productos: productosIds,
            total: total
        });

        // Guardar la factura en la base de datos
        await nuevaFactura.save();

        // Construir la respuesta con los detalles de los productos
        const respuesta = {
            productos: productosDetalles,
            total: total,
            _id: nuevaFactura._id
        };
        
        res.json(respuesta);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al agregar la factura');
    }
}

// Método GET para ver todas las facturas
exports.verFacturas = async (req, res) => {
    try {
        const facturas = await Factura.find().populate('productos');
        res.json(facturas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al ver las facturas');
    }
}

//Metodo GET BY ID
exports.verFactura = async (req, res) => {
    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(400).send('Formato de ID invalido');
        }

        const factura = await Factura.findById(req.params.id).populate('productos');
        if (!factura) {
            return res.status(404).send('Factura no encontrada');
        }
        res.json(factura);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al ver la factura');
    }
}

//Metodo PUT
exports.modificarFactura = async(req,res) => {
    try {
        // Verificar el formato del ID
        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(400).send('Formato de ID inválido');
        }

        // Calcular el nuevo total basado en los productos proporcionados en el cuerpo de la solicitud
        const { total, productosDetalles } = await totalFactura(req.body.productos);

        // Actualizar la factura con el nuevo total
        const factura = await Factura.findByIdAndUpdate(req.params.id, { productos: req.body.productos, total: total }, { new:true });

        if(!factura){
            return res.status(404).send('Factura no encontrada');
        }

        res.json(factura);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar la factura');
    }
}

//Metodo DELETE
exports.eliminarFactura = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(400).send('Formato de ID invalido');
        }

        const factura = await Factura.findByIdAndDelete(req.params.id);
        if(!factura){
            return res.status(404).send('Factura no encontrada')
        }
        res.send('Factura eliminada exitosamente!!!')
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar la factura');
    }
}

