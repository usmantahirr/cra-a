import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../organisms/sidebar';

import styles from './dashboardTemplate.module.scss';

const DashboardTemplate = ({ children }) => (
  <Layout className={styles.mainSection}>
    <Sidebar />
    <Layout className={styles.layoutSection}>{children}</Layout>
  </Layout>
);

export default DashboardTemplate;
