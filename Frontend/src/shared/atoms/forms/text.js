import React from 'react';
import { Input } from 'antd';

function CustomTextInput({ ...props }) {
  return <Input {...props} className="custom-control" />;
}

export default CustomTextInput;
