import React, { useContext } from 'react';
import { Layout } from 'antd';

import styles from './style.module.scss';
import SidebarFooter from '../../molecules/sidebarFooter';
import SidebarNavigation from '../../molecules/sidebarNavigation';
import ProfileCard from '../../molecules/profileCard';
import Logo from '../../atoms/logo';
import { SidebarContext } from '../../templates/sidebarContext';

const { Sider } = Layout;

const Sidebar = () => {
  const sidebarContext = useContext(SidebarContext);

  return (
    <Sider collapsible collapsed={sidebarContext.isCollapsed} className={`${styles.sidebar} sidebar`}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <ProfileCard />
      <SidebarNavigation />
      <SidebarFooter />
    </Sider>
  );
};

export default Sidebar;
