import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/HeaderVerClientes.module.css'; // Importa los estilos CSS como un objeto

const Header = () => {
  return (
    <Fragment>
      <header className={styles.hero}>
        <nav className={`${styles.nav} container`}>
          <figure className={styles.nav__logo}>
            <img className={styles.nav__img} src='/images/logoCliniVet.svg' alt="Logo CliniVet SENA" />
          </figure>
          <div className={`${styles.nav__link} ${styles.nav__input}`}>
            <label htmlFor="busqueda"></label>
            <input className={styles['nav__input--busqueda']} type="text" id="busqueda" />
            <img className={styles['nav__input--img']} src='/images/lupa.svg' alt="" />
          </div>
          <Link to="/menurecepcionistas" className={styles.nav__link}>Menu principal</Link>
          <Link to="/clienteNuevo" className={styles.nav__link}>Registrar cliente</Link>
          <Link to="/" className={styles.nav__link}>Logout</Link>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;


