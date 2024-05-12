import React, { Fragment } from 'react';
import styles from './style/HeaderLogin.module.css'; // Importa los estilos CSS como un objeto

const HeaderLogin = () => {
  return (
    <Fragment>
      <header>
        <figure className={styles.container__logo}> {/* Usa los estilos CSS a través del objeto 'styles' */}
          <img className={styles.nav__img} src='/images/logoCliniVet.svg' alt="Logo CliniVet SENA"/>
          <div className={styles.linea__header}></div>
        </figure>
      </header>
    </Fragment>
  );
}

export default HeaderLogin;