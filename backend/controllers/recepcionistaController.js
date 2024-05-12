const Recepcionista = require('../models/recepcionista');
const Cliente = require('../models/cliente');
const Veterinario = require('../models/veterinario');
const utilidades = require('../funciones/utilidades');

//Metodo POST
exports.agregarRecepcionista = async(req,res) => {
    try {

        const modelos = [Cliente, Recepcionista, Veterinario];

        // Verificar si ya existe un cliente con la misma identificación o correo
        const datosExistentes = await utilidades(modelos, req.body.identificacion, req.body.correo);

        if(datosExistentes){
            if(datosExistentes.identificacion === req.body.identificacion){
                return res.status(400).send('La identificacion proporcionada ya ha sido registrada');
            }else{
                return res.status(400).send('El correo proporcionado ya ha sido registrado');
            }
        }
            

        let crearRecepcionista;
        crearRecepcionista = new Recepcionista(req.body);
        await crearRecepcionista.save();
        res.json(crearRecepcionista);
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al agregar un recepcionista');
    }
}

//Metodo GET
exports.verRecepcionistas = async(req,res) => {

    try {
        const recepcionistas = await Recepcionista.find();
        res.json(recepcionistas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al ver los recepcionistas');
    }
}

//Metodo GET BY ID
exports.verRecepcionista = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(400).send('Formato de ID invalido');
        }

        const recepcionista = await Recepcionista.findById(req.params.id);
        if(!recepcionista){
            return res.status(404).send('Recepcionista no encontrado');
        }
        res.json(recepcionista)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al ver el recepcionista');
    }
}

//Metodo PUT
exports.modificarRecepcionista = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(400).send('Formato de ID invalido');
        }

        const recepcionista = await Recepcionista.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!recepcionista){
            return res.status(404).send('Recepcionista no encontrado')
        }
        res.json(recepcionista);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el recepcionista');
    }
}

//Metodo DELETE
exports.eliminarRecepcionista = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(400).send('Formato de ID invalido');
        };

        const recepcionista = await Recepcionista.findByIdAndDelete(req.params.id);
        if(!recepcionista){
            return res.status(404).send('Recepcionista no encontrado');
        }
        res.send('Recepcionista eliminado exitosamente');
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el recepcionista');
    }
}
