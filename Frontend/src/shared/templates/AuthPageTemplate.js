import React from 'react';
import { Row, Col } from 'antd';

import styles from './authPageTemplate.module.scss';

const AuthPageTemplate = ({ children }) => {
  return (
    <div className={styles.authContainer}>
      <Row className={styles.row}>
        <Col span={11} className={styles.salutationContainer}>
          <h2 className={styles.subHeading}>
            Welcome To&nbsp;
            <strong>
              Medical Test
              <br /> REGISTRATION Portal
            </strong>
          </h2>
        </Col>
        <Col span={12} className={styles.formContainer}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default AuthPageTemplate;
