import React from 'react';
import { Circles } from 'react-loader-spinner';
import styles from './styles.module.css';
import Logo from '../../assets/votelogo.png';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Circles height={30} width={30} color="#1ac2b4" />

      <h4>Quikvote System</h4>
      <div>
        <img
          src={Logo}
          alt="logo"
          style={{ position: 'absolute', bottom: 40, width: '40px', height: '40px' }}
        />
      </div>
    </div>
  );
};

export default Loader;
