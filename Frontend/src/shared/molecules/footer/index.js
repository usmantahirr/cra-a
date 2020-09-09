import React from 'react';
import { Button, Layout } from 'antd';

import styles from './style.module.scss';

const { Footer: AntFooter } = Layout;

const Footer = props => {
  const { goBack, goForward } = props;

  return (
    <AntFooter className={styles.footer}>
      <Button>Save as Draft</Button>
      <Button type="primary" onClick={goBack}>
        Prev
      </Button>
      <Button type="primary" onClick={goForward}>
        Next
      </Button>
    </AntFooter>
  );
};

export default Footer;
