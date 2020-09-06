import { Checkbox } from 'antd';
import React from 'react';

function CustomCheckbox({ checkboxText, ...props }) {
  return <Checkbox {...props}>{checkboxText}</Checkbox>;
}

export default CustomCheckbox;
