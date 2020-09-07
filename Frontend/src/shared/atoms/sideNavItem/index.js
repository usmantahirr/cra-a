import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';

const SideNavItem = ({ icon, text, isActive, link }) => {
  return (
    <Link
      to={link}
      className={classnames(styles.sideNavItem, {
        [styles.active]: isActive,
      })}
    >
      {icon}
      {text}
    </Link>
  );
};

export default SideNavItem;
