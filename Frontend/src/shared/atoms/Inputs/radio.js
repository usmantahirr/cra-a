import { Radio } from 'antd';
import React from 'react';

function CustomRadio({ options, ...props }) {
  return (
    <Radio.Group {...props}>
      {options &&
        options.map(option => (
          <Radio key={option.id} value={option.value}>
            {option.text}
          </Radio>
        ))}
    </Radio.Group>
  );
}

export default CustomRadio;
