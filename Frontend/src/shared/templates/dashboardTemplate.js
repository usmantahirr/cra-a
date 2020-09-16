import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../organisms/sidebar';

import styles from './dashboardTemplate.module.scss';
import { SidebarContextProvider } from './sidebarContext';

const DashboardTemplate = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <SidebarContextProvider
      value={{
        isCollapsed,
        setIsCollapsed,
      }}
    >
      <Layout className={styles.mainSection}>
        <Sidebar />
        <Layout className={styles.layoutSection}>{children}</Layout>
      </Layout>
    </SidebarContextProvider>
  );
};

export default DashboardTemplate;
