import React from 'react';
import CustomScroll from 'react-custom-scroll';
import SideNavItem from '../../atoms/sideNavItem';
import styles from './style.module.scss';

const content = [
  {
    text: 'New Applicaiton',
    icon: '/assets/icons/registration-icon',
    link: '/register',
    isActive: true,
  },
  {
    text: 'Manage Applications',
    icon: '/assets/icons/manage-application-icon',
    link: '/manage-application',
    isActive: false,
  },
  {
    text: 'Frequently Asked Questions',
    icon: '/assets/icons/faq-icon',
    link: 'https://screening.purehealth.ae/sapi/images/I_PH_Covid_Testing_FAQs.pdf',
    isActive: false,
    external: true,
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
      <CustomScroll addScrolledClass="test" heightRelativeToParent="100%">
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
      </CustomScroll>
    </div>
  );
};

export default SidebarNavigation;
