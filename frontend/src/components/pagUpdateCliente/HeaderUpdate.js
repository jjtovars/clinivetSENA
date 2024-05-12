import React, { Fragment } from 'react';
import styles from './style/HeaderUpdate.module.css'; // Importa los estilos CSS como un objeto

const HeaderUpdate = () => {
  return (
    <Fragment>
      <header className={styles.hero}>
        <nav className={`${styles.nav} container`}>
          <figure className={styles.nav__logo}>
            <img className={styles.nav__img} src='/images/logoCliniVet.svg' alt="Logo CliniVet SENA" />
          </figure>
          <a href="/menurecepcionistas" className={styles.nav__link}>Menu principal</a>
          <a href="/clientes" className={styles.nav__link}>Lista clientes</a>
          <a href="/clientenuevo" className={styles.nav__link}>Registrar cliente</a>
          <a href="/" className={styles.nav__link}>Logout</a>
        </nav>
      </header>
    </Fragment>
  );
};

export default HeaderUpdate;

