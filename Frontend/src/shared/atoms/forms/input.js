import React from 'react';
import { Form, Input } from 'antd';

const InputCustom = ({ label, type, placeholder, name, validators }) => {
  if (type === 'password') {
    return (
      <Form.Item label={label} {...validators} className="custom-item">
        <Input.Password placeholder={placeholder} type={type} name={name} className="custom-control" />
      </Form.Item>
    );
  }
  return (
    <Form.Item label={label} {...validators} className="custom-item">
      <Input placeholder={placeholder} type={type} name={name} className="custom-control" />
    </Form.Item>
  );
};

export default InputCustom;
