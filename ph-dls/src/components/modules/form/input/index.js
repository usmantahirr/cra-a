import React from 'react';

import styles from './style.module.scss';

const Input = ({ text, onChange, ...props }) => {
  return (
    <input className={styles.input} onChange={onChange} {...props}>
      {text}
    </input>
  );
};

export default Input;
