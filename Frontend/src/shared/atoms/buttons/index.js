import React from 'react';
import { Button as AntButton } from 'antd';

import styles from './styles.module.scss';

const Button = ({ type, className, children, ...props }) => (
  <AntButton className={className ? `${styles.button} ${className}` : styles.button} type={type} {...props}>
    {children}
  </AntButton>
);

export default Button;
