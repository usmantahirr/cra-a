import React from 'react';
import { Badge as AntBadge } from 'antd';

const Badge = ({ count, children }) => (
  <AntBadge count={12}>{children}</AntBadge>
);

export default Badge;
