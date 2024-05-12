const Producto = require('../models/producto');

//Metodo POST
exports.agregarProducto = async(req,res) => {

    try {

        const productoExistente = await Producto.findOne({codigo: req.body.codigo});
        if(productoExistente){
            return res.status(400).send('El codigo proporcionado ya ha sido registrado');
        }

        let crearProducto;
        crearProducto = new Producto(req.body);
        await crearProducto.save()
        res.json(crearProducto)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al agregar el producto')
    }
}

//Metodo GET
exports.verProductos = async(req,res) => {

    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al ver los productos');
    }
}

//Metodo GET BY ID
exports.verProducto = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(400).send('Formato de ID invalido');
        }

        const producto = await Producto.findById(req.params.id);
        if(!producto){
            return res.status(404).send('Producto no encontrado');
        }
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al ver el producto');
    }
}

//Metodo PUT
exports.modificarProducto = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(400).send('Formato de ID invalido');
        }

        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!producto){
            return res.status(404).send('Producto no encontrado');
        };
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el producto');
    }
}

//Metodo DELETE
exports.eliminarProducto = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(500).send('Formato de ID invalido');
        }

        const producto = await Producto.findByIdAndDelete(req.params.id);
        if(!producto){
            return res.status(404).send('Producto no encontrado')
        }
        res.send('Producto eliminado exitosamente');
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el producto');
    }
}

