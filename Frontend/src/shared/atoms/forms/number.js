import { InputNumber } from 'antd';
import React from 'react';

function CustomNumberInput({ ...props }) {
  return <InputNumber {...props} className="custom-control" />;
}

export default CustomNumberInput;
