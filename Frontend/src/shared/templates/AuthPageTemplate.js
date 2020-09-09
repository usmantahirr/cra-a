import React from 'react';
import { Row, Col, Image } from 'antd';
import { useHistory } from 'react-router';
import styles from './authPageTemplate.module.scss';
import Button from '../atoms/buttons';

const AuthPageTemplate = ({ children }) => {
  const history = useHistory();
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
                <Button className={styles.registerButton} onClick={() => history.push('/account/login')}>
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
