import React from 'react';
import SideNavItem from '../../atoms/sideNavItem';
import styles from './style.module.scss';

const content = [
  {
    text: 'Medical Test Registration',
    icon: '/assets/icons/registration-icon',
    link: '/',
    isActive: true,
  },
  {
    text: 'Manage Application',
    icon: '/assets/icons/manage-application-icon',
    link: '/manage-application',
    isActive: false,
  },
  {
    text: 'Frequently Asked Questions',
    icon: '/assets/icons/faq-icon',
    link: '/faq',
    isActive: false,
  },
  {
    text: 'More info on Covid',
    icon: '/assets/icons/covid-icon',
    link: 'covid',
    isActive: false,
  },
];

const SidebarNavigation = () => {
  return (
    <div className={styles.sidebarNavigation}>
      {content.map(item => (
        <SideNavItem isActive={item.isActive} text={item.text} iconSrc={item.icon} link={item.link} />
      ))}
    </div>
  );
};

export default SidebarNavigation;
