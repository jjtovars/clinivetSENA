const Cliente = require('../models/cliente');
const Recepcionista = require('../models/recepcionista');
const Veterinario = require('../models/veterinario')
const utilidades = require('../funciones/utilidades');

//Metodo POST 
exports.agregarCliente = async(req,res) => {

    try {

        const modelos = [Cliente, Recepcionista, Veterinario];

        // Verificar si ya existe un cliente con la misma identificación o correo
        const datosExistentes = await utilidades(modelos, req.body.identificacion, req.body.correo);

        // Si ya existe un cliente con esa identificación o correo, envía un mensaje de error
        if (datosExistentes) {
            if (datosExistentes.identificacion === req.body.identificacion) {
                return res.status(400).send('La identificación propocionada ya ha sido registrada');
            } else {
                return res.status(400).send('El correo proporcionado ya ha sido registrado');
            }
        }

        // Si no existe identificacion ni correo, proceso a crear el nuevo cliente
        let crearCliente;
        crearCliente = new Cliente(req.body);
        await crearCliente.save();
        res.json(crearCliente)       
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al agregar cliente')
    }
}

//Metodo GET
exports.verClientes = async(req,res) => {

    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al ver los clientes');
    }
}

//Metodo GET BY ID
exports.verCliente = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if (!idFormatoCorrecto) {
            return res.status(400).send('Formato de ID inválido');
        }

        const cliente = await Cliente.findById(req.params.id);
        if(!cliente){
            return res.status(404).send('Cliente no encontrado')
        }
        res.json(cliente)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al ver el cliente');
    }
}

//Metodo PUT
exports.modificarCliente = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if (!idFormatoCorrecto) {
            return res.status(400).send('Formato de ID inválido');
        }

        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if(!cliente){
            return res.status(404).send('Cliente no encontrado')
        }
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el cliente');
    }
}

//Metodo DELETE
exports.eliminarCliente = async(req,res) => {

    const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
    if (!idFormatoCorrecto) {
        return res.status(400).send('Formato de ID inválido');
    }

    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if(!cliente){
            return res.status(404).send('Cliente no encontrado')
        }
        res.send('Cliente eliminado exitosamente!!!')
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el cliente');
    }
}