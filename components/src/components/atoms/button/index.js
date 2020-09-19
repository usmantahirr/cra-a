import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntButton } from 'antd';

import styles from './style.module.scss';

const Button = ({ type, className, children, ...props }) => (
  <AntButton
    className={className ? `${styles.button} ${className}` : styles.button}
    type={type}
    {...props}
  >
    {children}
  </AntButton>
);

Button.propTypes = {
  href: PropTypes.string
};

export default Button;
