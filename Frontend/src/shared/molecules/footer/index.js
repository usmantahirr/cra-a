import React from 'react';
import { Layout } from 'antd';
import Button from '../../atoms/buttons';

import styles from './style.module.scss';

const { Footer: AntFooter } = Layout;

const Footer = props => {
  const { goBack, isLastStep, saveAsDraft } = props;

  return (
    <>
      <div className="desktop-footer">
        <AntFooter className={styles.footer}>
          <Button type="default" className={styles.antBtn} onClick={saveAsDraft}>
            Save as Draft
          </Button>
          <Button type="primary" className={styles.antBtn} onClick={goBack}>
            Prev
          </Button>
          {!isLastStep && (
            <Button type="primary" className={styles.antBtn} htmlType="submit">
              Next
            </Button>
          )}
        </AntFooter>
      </div>

      <div className="mobile-footer">
        <AntFooter className={`${styles.footer} footer`}>
          <Button type="default" className={styles.antBtn} onClick={saveAsDraft}>
            <img src="/assets/img/icon-save.svg" alt="" />
          </Button>
          <Button type="default" className={styles.antBtn} onClick={goBack}>
            <img src="/assets/img/icon-back.svg" alt="" />
          </Button>
          {!isLastStep && (
            <Button type="primary" className={styles.antBtn} htmlType="submit">
              Next
            </Button>
          )}
        </AntFooter>
      </div>
    </>
  );
};

export default Footer;
