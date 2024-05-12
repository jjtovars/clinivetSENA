const Veterinario = require('../models/veterinario');
const Cliente = require('../models/cliente');
const Recepcionista = require('../models/recepcionista');
const utilidades = require('../funciones/utilidades');

//Metodo POST
exports.agregarVeterinario = async(req,res) => {

    try {

        const modelos = [Cliente, Recepcionista, Veterinario];

        const datosExistentes = await utilidades(modelos, req.body.identificacion, req.body.correo);

        if(datosExistentes){
            if(datosExistentes.identificacion === req.body.identificacion){
                return res.status(400).send('La identificación propocionada ya ha sido registrada')
            }else{
                return res.status(400).send('El correo proporcionado ya ha sido registrado')
            }
        }


        let crearVeterinario;
        crearVeterinario = new Veterinario(req.body);
        await crearVeterinario.save();
        res.json(crearVeterinario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al agregar un veterinario');
    }
}

//Metodo GET
exports.verVeterinarios = async(req,res) => {
    
    try {
        const veterinarios = await Veterinario.find();
        res.json(veterinarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al agregar un veterinario');
    };
};

//Metodo GET BY ID
exports.verVeterinario = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(400).send('Formato de ID invalido');
        }

        const veterinario = await Veterinario.findById(req.params.id);
        if(!veterinario){
            return res.status(404).send('Veterinario no encontrado')
        }
        res.json(veterinario)
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al agregar un veterinario');
    }
}

//Metodo PUT
exports.modificarVeterinario = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(400).send('Formato de ID invalido')
        }

        const veterinario = await Veterinario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!veterinario){
            return res.status(404).send('Veterinario no encontrado')
        }
        res.json(veterinario)
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al agregar un veterinario');
    }
}

//Metodo DELETE
exports.eliminarVeterinario = async(req,res) => {

    try {

        const idFormatoCorrecto = /^[0-9a-fA-F]{24}$/.test(req.params.id);
        if(!idFormatoCorrecto){
            return res.status(400).send('Formato de ID invalido');
        }

        const veterinario = await Veterinario.findByIdAndDelete(req.params.id);
        if(!veterinario){
            return res.status(404).send('Veterinario no encontrado')
        }
        res.send('Veterinario eliminado exitosamente!!!')
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al agregar un veterinario');
    }
}