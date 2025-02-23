import React from 'react';
import { Layout } from 'antd';
import Button from '../../atoms/buttons';

import styles from './style.module.scss';

const { Footer: AntFooter } = Layout;

const Footer = props => {
  const { goBack, onAllStepsCompleted, isLastStep } = props;

  return (
    <AntFooter className={styles.footer}>
      <Button type="default" className={styles.antBtn}>
        Save as Draft
      </Button>
      <Button type="primary" className={styles.antBtn} onClick={goBack}>
        Prev
      </Button>
      <Button type="primary" className={styles.antBtn} htmlType="submit">
        Next
      </Button>
      {isLastStep && <Button onClick={onAllStepsCompleted}>Finish</Button>}
    </AntFooter>
  );
};

export default Footer;
