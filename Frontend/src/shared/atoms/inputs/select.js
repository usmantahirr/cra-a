import { Select } from 'antd';
import React from 'react';

function CustomSelect({ options, ...props }) {
  return (
    <Select {...props}>
      {options &&
        options.map(option => (
          <Select.Option key={option.id} value={option.value}>
            {option.text}
          </Select.Option>
        ))}
    </Select>
  );
}

export default CustomSelect;
