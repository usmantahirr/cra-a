import React from 'react';
import { Badge as AntBadge } from 'antd';

const Badge = ({ count, children, ...props }) => (
  <AntBadge count={count} {...props}>
    {children}
  </AntBadge>
);

export default Badge;
