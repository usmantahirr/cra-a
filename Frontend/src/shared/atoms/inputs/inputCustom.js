import React from 'react';
import { Form, Input } from 'antd';

const InputCustom = ({ label, type, placeholder, name }) => (
  <Form.Item label={label} className="custom-item">
    <Input placeholder={placeholder} type={type} name={name} className="custom-control" />
  </Form.Item>
);

export default InputCustom;
