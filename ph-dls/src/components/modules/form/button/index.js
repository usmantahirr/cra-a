import React from 'react';
import { Button as AntButton } from 'antd';

import styles from './style.module.scss';

const Button = ({ onClick, children, ...props }) => {
  return (
    <AntButton className={styles.button} onClick={onClick} {...props}>
      {children}
    </AntButton>
  );
};

export default Button;
