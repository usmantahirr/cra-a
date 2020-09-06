import React from 'react';
import { Radio } from 'antd';

function RadioButton({ children, ...props }) {
  return <Radio {...props}>{children}</Radio>;
}

export default RadioButton;
