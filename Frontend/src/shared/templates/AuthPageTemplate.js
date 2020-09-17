import React, { Fragment } from 'react';
import { Row, Col, Image } from 'antd';
import { useHistory } from 'react-router';
import styles from './authPageTemplate.module.scss';
import Button from '../atoms/buttons';
import { AUTH_PAGE, SIGNUP_PAGE } from '../../config';

const AuthPageTemplate = ({
  children,
  showSalutationContainer = true,
  showLoginButton = true,
  showSignUpButton = false,
}) => {
  const history = useHistory();
  return (
    <div className={styles.authcontainer}>
      <Row justify="center" className={styles.row}>
        <Col xs={23} md={23} xl={20} className={styles.mgrow}>
          <Row justify="center" className={styles.row}>
            <Col xs={24} md={13} xl={13} className={styles.formcontainer}>
              <Image src="/assets/img/logo.png" className={styles.logobox} />
              {children}
            </Col>
            {showSalutationContainer && (
              <Col md={11} xl={11} className={styles.salutationcontainer}>
                <div className={styles.salutationholder}>
                  <h2 className={styles.subheading}>
                    Welcome To&nbsp;
                    <strong>
                      Medical Test
                      <br /> REGISTRATION Portal
                    </strong>
                  </h2>
                  {showLoginButton && (
                    <Button className={styles.registerButton} onClick={() => history.push(AUTH_PAGE)}>
                      Back to login
                    </Button>
                  )}
                  {showSignUpButton && (
                    <Fragment>
                      <p className={styles.smalInfo}>Don’t have an account?</p>
                      <Button className={styles.registerButton} onClick={() => history.push(SIGNUP_PAGE)}>
                        Register
                      </Button>
                    </Fragment>
                  )}
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AuthPageTemplate;
