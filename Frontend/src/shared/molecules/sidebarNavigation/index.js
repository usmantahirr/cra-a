import React from 'react';
import SideNavItem from '../../atoms/sideNavItem';
import styles from './style.module.scss';

const content = [
  {
    text: 'Medical Test Registration',
    icon: '/assets/icons/registration-icon',
    link: '/register',
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
    link: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public',
    isActive: false,
    external: true,
  },
];

const SidebarNavigation = () => {
  return (
    <div className={styles.sidebarNavigation}>
      {content.map(item => (
        <SideNavItem
          key={item.link}
          isActive={item.isActive}
          text={item.text}
          iconSrc={item.icon}
          link={item.link}
          external={item.external}
        />
      ))}
    </div>
  );
};

export default SidebarNavigation;
