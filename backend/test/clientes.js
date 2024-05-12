const express = require('express');
const app = express();
const Cliente = require('../models/cliente');
const router = require('../routes/rutas');

app.use(express.json());

//Metodo GET para pruebas unitarias
exports.verClientes = async(req,res) => {

    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al ver los clientes');
    }
}


//Metodo POST para pruebas unitarias
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

module.exports = {app, router};