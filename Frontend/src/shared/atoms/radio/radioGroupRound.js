import { Radio } from 'antd';
import React from 'react';

const options = [
  {
    id: 1,
    value: 'approved',
    text: 'Pre-Approved Visa',
  },
  {
    id: 2,
    value: 'arrival',
    text: 'On-Arrival',
  },
];

function RadioGroupRound({ ...props }) {
  return (
    <Radio.Group {...props} className="ant-radio-round">
      {options &&
        options.map(option => (
          <Radio key={option.id} value={option.value}>
            {option.text}
          </Radio>
        ))}
    </Radio.Group>
  );
}

export default RadioGroupRound;
