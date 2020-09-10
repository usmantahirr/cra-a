import { Input } from 'antd';
import React from 'react';

function CustomTextInput({ ...props }) {
  return <Input {...props} className="custom-control" />;
}

export default CustomTextInput;
