import React, { useState } from 'react';
import { Layout } from 'antd';
import { SidebarContextProvider } from '../../../shared/templates/sidebarContext';
import Sidebar from '../../../shared/organisms/sidebar';
import Header from '../../../shared/molecules/header';
import { ApplicationContextProvider } from '../context/applicationContext';
import styles from './layoutTemplate.module.scss';

const LayoutTemplate = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [heading, setHeading] = useState('');

  return (
    <ApplicationContextProvider
      value={{
        heading,
        setHeading,
      }}
    >
      <SidebarContextProvider
        value={{
          isCollapsed,
          setIsCollapsed,
        }}
      >
        <Layout className={styles.mainSection}>
          <Sidebar />
          <Header pageHeader heading={heading} />
          <Layout className={styles.layoutSection}>{children}</Layout>
        </Layout>
      </SidebarContextProvider>
    </ApplicationContextProvider>
  );
};

export default LayoutTemplate;
