import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Row, Col, Image, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import './login.scss';
import Button from '../../shared/atoms/buttons/index';
import InputCustom from '../../shared/atoms/inputs/index';
import CheckboxCustom from '../../shared/atoms/checkboxes/index';

const { Title } = Typography;

const LoginPage = ({ handleSubmit }) => (
  <div className="loginpage">
    <Row>
      <Col span={11} className="loginbg">
        <h2 className="sub-heading">
          Welcome To{' '}
          <strong>
            Medical Test
            <br /> REGISTRATION Portal
          </strong>
        </h2>
      </Col>
      <Col span={12} className="loginform">
        <div className="loginform-holder">
          <a className="app-link" href="/" rel="noopener noreferrer" title="Pure Health">
            <Image src="/assets/img/logo.svg" className="logo-holder" alt="Pure Health" />
          </a>

          <Title level={3} className="inner-heading">
            Login
          </Title>

          <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
            {({ values, touched, errors, isSubmitting, handleSubmit: submit, handleChange }) => (
              <form onSubmit={submit}>
                {/* <Form.Item required>
              <Input placeholder="User ID" type="email" name="email" onChange={handleChange} value={values.email} prefix={<WifiOutlined />} />
            </Form.Item> */}

                <InputCustom
                  placeholder="User ID"
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                  className="custom-control"
                />
                {errors.email && touched.email && errors.email}

                {/* <input type="password" name="password" onChange={handleChange} value={values.password} /> */}
                <InputCustom
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  className="custom-control"
                />
                {errors.password && touched.password && errors.password}

                <Row className="checkbox-options">
                  <Col span={12} className="checbox-holder">
                    <CheckboxCustom value="Remember me" className="custom-checbox small">
                      Remember me
                    </CheckboxCustom>
                  </Col>
                  <Col span={12} className="forgot-link">
                    <a className="forgot-link" rel="noopener noreferrer" title="Forgot Password" href="/">
                      Forgot password
                    </a>
                  </Col>
                </Row>

                <div className="loginbtn-holder">
                  <Button type="secondary" htmlType="submit" disabled={isSubmitting} icon={<RightOutlined />}>
                    Signin
                  </Button>
                  <Button type="primary" htmlType="submit" disabled={isSubmitting} icon={<RightOutlined />}>
                    Signup
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Col>
    </Row>
  </div>
);

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginPage;
