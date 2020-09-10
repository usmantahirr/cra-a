import { Input } from 'antd';
import React from 'react';

function CustomPasswordInput({ ...props }) {
  return <Input.Password {...props} />;
}

export default CustomPasswordInput;
