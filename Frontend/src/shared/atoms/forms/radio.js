import { Radio } from 'antd';
import React from 'react';

function CustomRadio({ options, ...props }) {
  return (
    <Radio.Group className="ant-radio-lg ant-radio-center" {...props}>
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
