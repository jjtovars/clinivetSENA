const express = require('express');
const cors = require('cors');
const conectarDB = require('../config/db');
const app = express();

conectarDB();
app.use(cors());

app.use(express.json());
app.use('/api/clinivetsena', require('../routes/rutas'));

app.get('/', (req,res) => {
    res.send('Hello Word')
})

const port = process.env.PORT || 10000;

const server = app.listen(port, () => {
    console.log('Conexion exitosa con el servidor http://localhost:10000')
})

module.exports = { app, server }; // Exporta la aplicación y el servidor

//subir a github
