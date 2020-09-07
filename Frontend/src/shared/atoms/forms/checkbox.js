import React from 'react';
import { Checkbox } from 'antd';

function CustomCheckbox({ children, ...props }) {
  return <Checkbox {...props}>{children}</Checkbox>;
}

export default CustomCheckbox;
