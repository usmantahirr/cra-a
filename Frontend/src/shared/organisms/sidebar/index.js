import React from 'react';
import { Layout } from 'antd';

import styles from './style.module.scss';
import SidebarFooter from '../../molecules/sidebarFooter';
import SidebarNavigation from '../../molecules/sidebarNavigation';
import ProfileCard from '../../molecules/profileCard';
import Logo from '../../atoms/logo';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider className={styles.sidebar}>
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
