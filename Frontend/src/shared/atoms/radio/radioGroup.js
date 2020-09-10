import { Radio } from 'antd';
import React from 'react';

function RadioGroup({ options, ...props }) {
  return (
    <Radio.Group {...props} className="ant-radio-lg">
      {options &&
        options.map(option => (
          <Radio key={option.id} value={option.value}>
            {option.text}
          </Radio>
        ))}
    </Radio.Group>
  );
}

export default RadioGroup;
