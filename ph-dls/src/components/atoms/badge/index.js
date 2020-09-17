import React from 'react';
import { Badge as AntBadge } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import styles from '../button/style.module.scss';

const Badge = ({ count, className, children, ...props }) => (
  <AntBadge
    className={className ? `${styles.button} ${className}` : styles.button}
    count={count}
    {...props}
  >
    {children}
  </AntBadge>
);

Badge.propTypes = {
  ...BadgeProps
};

export default Badge;
