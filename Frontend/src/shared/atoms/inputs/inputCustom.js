import React from 'react';
import { Form, Input } from 'antd';

const InputCustom = ({ type, placeholder, name, className }) => (
  <Form.Item className="">
    <Input placeholder={placeholder} type={type} name={name} className={className} />
  </Form.Item>
);

export default InputCustom;
