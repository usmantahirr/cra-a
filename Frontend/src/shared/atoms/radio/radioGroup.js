import { Radio } from 'antd';
import React from 'react';

const options = [
  {
    id: 1,
    value: 'transit',
    text: 'Transit Visa',
  },
  {
    id: 2,
    value: 'visitor',
    text: 'Visitor',
  },
  {
    id: 3,
    value: 'resident',
    text: 'UAE Resident',
  },
];

function RadioGroup({ ...props }) {
  console.log(props);
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
