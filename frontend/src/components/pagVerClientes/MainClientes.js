import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './styles/MainClientes.css'
import Header from './Header';
import { Link } from 'react-router-dom';


const MainClientes = () => {
const [clientes, setClientes] = useState([]);

useEffect(() => {
  fetchClientes();
}, []);

const fetchClientes = async () => {
  try {
    const response = await axios.get('http://localhost:10000/api/clinivetsena/clientes');
    setClientes(response.data);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
  }
};

const handleDeleteCliente = async (id) => {
  try {
    await axios.delete(`http://localhost:10000/api/clinivetsena/clientes/${id}`);
    // Después de eliminar el cliente, actualiza la lista de clientes
    fetchClientes();
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
  }
};

  return (
    <Fragment>
      <Header />
      <div className="container">
        <table className="container__table">
          <thead>
            <tr>
              <th className="celda celda__encabezado">Identificación</th>
              <th className="celda celda__encabezado">Nombres</th>
              <th className="celda celda__encabezado">Apellidos</th>
              <th className="celda celda__encabezado">Departamento</th>
              <th className="celda celda__encabezado">Ciudad</th>
              <th className="celda celda__encabezado">Dirección</th>
              <th className="celda celda__encabezado">Telefono</th>
              <th className="celda celda__encabezado">Email</th>
              <th className="celda celda__encabezado">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente._id}>
                <td className="celda">{cliente.identificacion}</td>
                <td className="celda">{cliente.nombres}</td>
                <td className="celda">{cliente.apellidos}</td>
                <td className="celda">{cliente.departamento}</td>
                <td className="celda">{cliente.ciudad}</td>
                <td className="celda">{cliente.direccion}</td>
                <td className="celda">{cliente.telefono}</td>
                <td className="celda">{cliente.correo}</td>
                <td className="celda"> 
                  <Link to={`/clientesupdate/${cliente._id}`} className="btn boton__edit">Editar</Link>
                  <button className="btn boton__delete" onClick={() => handleDeleteCliente(cliente._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default MainClientes;