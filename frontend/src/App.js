import './App.css';
import React from 'react';
import MainClientes from './components/pagVerClientes/MainClientes.js';
import UpdateClientes from './components/pagUpdateCliente/UpdateClientes.js';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CrearCliente from './components/pagCrearCliente/CrearCliente.js';
import Login from './components/pagLogin/Login.js';
import MenuRecepcionistas from './components/pagMenuRecepcionistas/MenuRecepcionistas.js';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='container container-fluid'></div>
          <Routes>
            <Route path='/clientes' element={<MainClientes />} />
            <Route path='/clientesupdate/:id' element={<UpdateClientes />} />
            <Route path='/clientenuevo' element={<CrearCliente />}/>
            <Route path='/' element={<Login />} />
            <Route path='/menurecepcionistas' element={<MenuRecepcionistas/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;