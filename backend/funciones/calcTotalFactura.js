// facturaService.js
const Producto = require('../models/producto');

async function calcularTotalFactura(productosIds) {
    try {
        // Buscar los productos en la base de datos
        const productos = await Producto.find({ _id: { $in: productosIds } });

        // Calcular el total sumando los precios de los productos, teniendo en cuenta la cantidad
        let total = 0;
        let productosDetalles = [];

        productos.forEach(producto => {
            const cantidad = productosIds.filter(id => id === producto._id.toString()).length;
            total += parseFloat(producto.precio) * cantidad; // Multiplicar el precio por la cantidad

            // Agregar detalles del producto a la lista
            productosDetalles.push({
                _id: producto._id,
                nombre: producto.nombre,
                precio: parseFloat(producto.precio),
                cantidad: cantidad
            });
        });

        return { total, productosDetalles };
    } catch (error) {
        console.log(error);
        throw new Error('Error al calcular el total de la factura');
    }
}

module.exports = calcularTotalFactura;




