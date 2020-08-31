import React from 'react';
import { Button as AntButton } from 'antd';

const Button = ({ type, children, ...props }) => (
  <AntButton type={type} {...props}>
    {children}
  </AntButton>
);

export default Button;
