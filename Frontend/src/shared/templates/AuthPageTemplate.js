import React from 'react';
import { Row, Col, Image } from 'antd';
import { Link } from 'react-router-dom';

import styles from './authPageTemplate.module.scss';

const AuthPageTemplate = ({ children }) => {
  return (
    <div className={styles.authcontainer}>
      <Row justify="center" className={styles.row}>
        <Col span={20} className={styles.mgrow}>
          <Row className={styles.row}>
            <Col span={13} className={styles.formcontainer}>
              <Image src="/assets/img/logo.png" className={styles.logobox} />
              {children}
            </Col>
            <Col span={11} className={styles.salutationcontainer}>
              <div className={styles.salutationholder}>
                <h2 className={styles.subheading}>
                  Welcome To&nbsp;
                  <strong>
                    Medical Test
                    <br /> REGISTRATION Portal
                  </strong>
                </h2>
                <Link to="/account/login" className="ant-btn ant-btn-link ant-btn-default">
                  Back to login
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AuthPageTemplate;
