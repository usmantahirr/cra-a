import React from 'react';
import { Row, Col, Image } from 'antd';
import Button from '../atoms/buttons/index';

import styles from './authPageTemplate.module.scss';

const AuthPageTemplate = ({ children }) => {
  return (
    <div className={styles.authcontainer}>
      <Row justify="center" className={styles.row}>
        <Col span={20}>
          <Row className={styles.row}>
            <Col span={13} className={styles.formcontainer}>
              <Image src="/assets/img/logo.svg" className="logobox" />
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
