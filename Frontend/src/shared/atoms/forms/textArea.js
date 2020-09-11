import { Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

function CustomTextAreaInput({ ...props }) {
  return <TextArea {...props} className="custom-control" />;
}

export default CustomTextAreaInput;
