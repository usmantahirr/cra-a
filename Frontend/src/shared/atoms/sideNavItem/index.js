import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'antd';

import styles from './style.module.scss';

const SideNavItem = ({ iconSrc, text, isActive, link }) => {
  return (
    <Link to={link} className={`${styles.sideNavItem} ${isActive ? styles.active : ''}`}>
      <div className={styles.icon}>
        {iconSrc && <Image preview={false} src={isActive ? `${iconSrc}-active.png` : `${iconSrc}.png`} />}
      </div>
      <div className={styles.text}>{text}</div>
    </Link>
  );
};

export default SideNavItem;
