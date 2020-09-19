import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';

import './style.scss';

const Checkbox = ({ children, ...props }) => {
  return <AntCheckbox {...props}>{children}</AntCheckbox>;
};

export default Checkbox;
