import React from 'react';
import { Button, Layout } from 'antd';

import styles from './style.module.scss';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className={styles.footer}>
      <Button>Save as Draft</Button>
      <Button type="primary">Prev</Button>
      <Button type="primary">Next</Button>
    </AntFooter>
  );
};

export default Footer;
