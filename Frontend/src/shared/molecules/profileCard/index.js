import React from 'react';
import { Avatar, Button as AntButton, Badge, Image, Menu, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

import Logger from '../../modules/logger';
import authService from '../../../modules/auth/services/auth.service';

import styles from './style.module.scss';

const ProfileCard = () => {
  const logout = () => {
    localStorage.clear();
    authService.logout();
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <AntButton
          type="link"
          rel="noopener noreferrer"
          onClick={() => {
            Logger.info('Profile Button');
          }}
        >
          Profile
        </AntButton>
      </Menu.Item>
      <Menu.Item key="0">
        <AntButton type="link" rel="noopener noreferrer" onClick={logout}>
          Logout
        </AntButton>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.profileCard}>
      <div className={styles.avatar}>
        <Avatar size={64} icon={<UserOutlined />} className={styles.img} />
      </div>
      <div className={styles.name}>
        Logged In User
        <Dropdown overlay={menu} placement="bottomCenter">
          <AntButton shape="circle" className={styles.dropdownButton} onClick={e => e.preventDefault()}>
            <DownOutlined className={styles.caret} />
          </AntButton>
        </Dropdown>
      </div>
      <div className={styles.avatarActions}>
        <Badge count={10} className={styles.badge}>
          <AntButton className={styles.actionButton} shape="circle-outline">
            <Image src="/assets/icons/notification-icon.png" alt="Notification" preview={false} />
          </AntButton>
        </Badge>
        <AntButton className={styles.actionButton} shape="circle">
          <Image src="/assets/icons/cog-icon.png" alt="Settings" preview={false} />
        </AntButton>
      </div>
    </div>
  );
};

export default ProfileCard;
