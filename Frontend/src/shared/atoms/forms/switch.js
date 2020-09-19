import React from 'react';
import { Switch } from 'antd';

function CustomSwitch({ children, ...props }) {
  return <Switch {...props}>{children}</Switch>;
}

export default CustomSwitch;
