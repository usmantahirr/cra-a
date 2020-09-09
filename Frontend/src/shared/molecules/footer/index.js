import React from 'react';
import { Layout } from 'antd';
import Button from '../../atoms/buttons';

import styles from './style.module.scss';

const { Footer: AntFooter } = Layout;

const Footer = props => {
  const { goBack, goForward } = props;

  return (
    <AntFooter className={styles.footer}>
      <Button type="default" className={styles.antBtn}>
        Save as Draft
      </Button>
      <Button type="primary" className={styles.antBtn} onClick={goBack}>
        Prev
      </Button>
      <Button type="primary" className={styles.antBtn} onClick={goForward}>
        Next
      </Button>
    </AntFooter>
  );
};

export default Footer;
