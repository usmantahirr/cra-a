import { Radio } from 'antd';
import React from 'react';

function RadioButton({ children, ...props }) {
  return <Radio {...props}>{children}</Radio>;
}

export default RadioButton;
