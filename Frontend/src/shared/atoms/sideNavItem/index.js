import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Image } from 'antd';

import styles from './style.module.scss';
import './navActive.scss';

const SideNavItem = ({ iconSrc, text, link, external }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  if (external) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.sideNavItem}>
        <div className={styles.icon}>
          {iconSrc && <Image preview={false} src={isActive ? `${iconSrc}-active.png` : `${iconSrc}.png`} />}
        </div>
        <div className={`${styles.text} ${isActive ? 'sidebar-active-item-text' : ''}`}>{text}</div>
      </a>
    );
  }

  return (
    <NavLink to={link} className={styles.sideNavItem} activeClassName="sidebar-active-item">
      <div className={styles.icon}>
        {iconSrc && <Image preview={false} src={isActive ? `${iconSrc}-active.png` : `${iconSrc}.png`} />}
      </div>
      <div className={`${styles.text} ${isActive ? 'sidebar-active-item-text' : ''}`}>{text}</div>
    </NavLink>
  );
};

export default SideNavItem;
