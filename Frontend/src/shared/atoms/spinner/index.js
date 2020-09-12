import React from 'react';
import { Spin } from 'antd';

function CustomSpinner({ children, ...props }) {
  // tip="Loading..."
  return <Spin {...props}>{children}</Spin>;
}

export default CustomSpinner;
