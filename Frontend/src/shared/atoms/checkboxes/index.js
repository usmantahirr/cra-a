import React from 'react';
import { Checkbox } from 'antd';

const CheckboxCustom = ({ value, children, className }) => (
  <Checkbox className={className} value={value}>
    {children}
  </Checkbox>
);

export default CheckboxCustom;
