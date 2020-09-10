import React from 'react';
import { Select } from 'antd';

function CustomSelectSmall({ options, ...props }) {
  return (
    <Select {...props} className="custom-control custom-control-sm">
      {options &&
        options.map(option => (
          <Select.Option key={option.id} value={option.value}>
            {option.text}
          </Select.Option>
        ))}
    </Select>
  );
}

export default CustomSelectSmall;
