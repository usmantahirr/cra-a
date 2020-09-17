import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';

import './style.scss';

const Checkbox = ({ children, ...props }) => {
  return <AntCheckbox {...props}>{children}</AntCheckbox>;
};

Checkbox.propTypes = {
  ...CheckboxProps
};

export default Checkbox;
