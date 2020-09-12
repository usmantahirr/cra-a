import React from 'react';
import { Breadcrumb } from 'antd';

import styles from './style.module.scss';

const CustomBreadcrumb = ({ className, ...props }) => (
  <Breadcrumb separator=">" className={className ? `${styles.breadcrumb} ${className}` : styles.breadcrumb} {...props}>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>Manage Application</Breadcrumb.Item>
  </Breadcrumb>
);

export default CustomBreadcrumb;
