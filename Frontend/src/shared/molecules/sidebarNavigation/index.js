import React from 'react';
import SideNavItem from '../../atoms/sideNavItem';
import styles from './style.module.scss';

const content = [
  {
    text: 'Medical Test Registration',
    icon: 'icon',
    link: '/register',
    isActive: true,
  },
  {
    text: 'Manage Application',
    icon: 'icon',
    link: '/manage-application',
    isActive: false,
  },
  {
    text: 'Frequently Asked Questions',
    icon: 'icon',
    link: '/faq',
    isActive: false,
  },
  {
    text: 'More info on Covid',
    icon: 'icon',
    link: 'covid',
    isActive: false,
  },
];

const SidebarNavigation = () => {
  return (
    <div className={styles.sidebarNavigation}>
      {content.map(item => (
        <SideNavItem isActive={item.isActive} text={item.text} icon={item.icon} link={item.link} />
      ))}
    </div>
  );
};

export default SidebarNavigation;
