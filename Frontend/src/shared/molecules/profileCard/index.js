import React, { useEffect, useState } from 'react';
import { Button as AntButton, Badge, Image } from 'antd';
// import { UserOutlined, DownOutlined } from '@ant-design/icons';

// import Logger from '../../modules/logger';
import MSALService from '../../../modules/auth/services/msal.service';

import styles from './style.module.scss';

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const logout = () => {
    localStorage.clear();
    MSALService.logout();
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const getNameInitial = name => {
    if (name) {
      return name
        .match(/(\b\S)?/g)
        .join('')
        .match(/(^\S|\S$)?/g)
        .join('')
        .toUpperCase();
    }
    return '';
  };

  // const menu = (
  //   <Menu>
  //     <Menu.Item key="1">
  //       <AntButton
  //         type="link"
  //         rel="noopener noreferrer"
  //         onClick={() => {
  //           Logger.info('Profile Button');
  //         }}
  //       >
  //         Profile
  //       </AntButton>
  //     </Menu.Item>
  //     <Menu.Item key="0">
  //       <AntButton type="link" rel="noopener noreferrer" onClick={logout}>
  //         Logout
  //       </AntButton>
  //     </Menu.Item>
  //   </Menu>
  // );

  return (
    <div className={styles.profileCard}>
      <div className={styles.initials}>
        <div className={styles.inName}>{user && getNameInitial(user.name)}</div>
      </div>
      <div className={styles.name}>
        {user && user.name}
        {/* <Dropdown overlay={menu} placement="bottomCenter">
          <AntButton shape="circle" className={styles.dropdownButton} onClick={e => e.preventDefault()}>
            <DownOutlined className={styles.caret} />
          </AntButton>
        </Dropdown> */}
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
        <AntButton className={styles.actionButton} shape="circle" rel="noopener noreferrer" onClick={logout}>
          <Image src="/assets/icons/logout-icon.png" alt="Logout" preview={false} />
        </AntButton>
      </div>
    </div>
  );
};

export default ProfileCard;
