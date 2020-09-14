import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../organisms/sidebar';

import styles from './dashboardTemplate.module.scss';
import { SidebarContextProvider } from './sidebarContext';

const DashboardTemplate = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Layout className={styles.mainSection}>
      <SidebarContextProvider
        value={{
          isCollapsed,
          setIsCollapsed,
        }}
      >
        <Sidebar />
        <Layout className={styles.layoutSection}>{children}</Layout>
      </SidebarContextProvider>
    </Layout>
  );
};

export default DashboardTemplate;
