import React from 'react';
import { Button } from 'antd';

import { CustomSelect } from '../../atoms/forms';
import styles from './style.module.scss';

const SidebarFooter = () => {
  // TODO: create language dropdown
  return (
    <div className={styles.sidebarFooter}>
      <CustomSelect
        options={[
          {
            text: 'English',
            value: 'en',
            id: '1',
          },
          {
            text: 'Arabic',
            value: 'ar',
            id: '2',
          },
        ]}
      />
      <Button type="primary">Speak to us!</Button>
    </div>
  );
};

export default SidebarFooter;
