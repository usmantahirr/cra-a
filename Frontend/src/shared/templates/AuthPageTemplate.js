import React from 'react';
import { Row, Col, Image } from 'antd';
import Button from '../atoms/buttons/index';

import styles from './authPageTemplate.module.scss';

const AuthPageTemplate = ({ children }) => {
  return (
    <div className={styles.authContainer}>
      <Row justify="center" className={styles.row}>
        <Col span={20}>
          <Row className={styles.row}>
            <Col span={13} className={styles.formContainer}>
              <Image src="/assets/img/logo.svg" className={styles.logo} />
              {children}
            </Col>
            <Col span={11} className={styles.salutationContainer}>
              <div className={styles.salutationHolder}>
                <h2 className={styles.subHeading}>
                  Welcome To&nbsp;
                  <strong>
                    Medical Test
                    <br /> REGISTRATION Portal
                  </strong>
                </h2>
                <Button type="default" htmlType="submit">
                  Back to login
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AuthPageTemplate;
