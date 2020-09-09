import { DatePicker } from 'antd';
import React from 'react';

function CustomDatePicker({ ...props }) {
  return <DatePicker {...props} className="custom-control" />;
  //   <Form.Item label={label} {...validators} className="custom-item">
  //   <Input placeholder={placeholder} type={type} name={name} />
  // </Form.Item>
}

export default CustomDatePicker;
