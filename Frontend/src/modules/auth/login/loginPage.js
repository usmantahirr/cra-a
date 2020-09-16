import React from 'react';
import { Form, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import AuthPageTemplate from '../../../shared/templates/AuthPageTemplate';
import InputCustom from '../../../shared/atoms/forms/input';
import Button from '../../../shared/atoms/buttons';
import { FORGOT_PASSWORD_PAGE } from '../../../config';

const Login = ({ validationRules, handleSubmit, showLoader }) => {
  const [loginForm] = Form.useForm();

  return (
    <AuthPageTemplate showLoginButton={false} showSignUpButton>
      <Form className="transbg-form" form={loginForm} name="register" onFinish={handleSubmit}>
        <InputCustom
          placeholder="Email Address"
          type="email"
          value="email"
          validators={validationRules.email}
          className="custom-control"
        />
        <InputCustom
          placeholder="Password"
          type="password"
          value="password"
          validators={validationRules.password}
          className="custom-control"
        />
        <Row className="checkbox-options">
          <Col offset={16} span={12} className="forgot-link">
            {/* <Button type="link" rel="noopener noreferrer" onClick={() => history.push(FORGOT_PASSWORD_PAGE)} >Forgot password</Button> */}
            <Link to={FORGOT_PASSWORD_PAGE}>forgot your password?</Link>
          </Col>
        </Row>
        <Form.Item>
          <Button loading={showLoader} type="primary" htmlType="submit" className="ant-btn-block ant-btn-lg">
            Login
          </Button>
        </Form.Item>
      </Form>
    </AuthPageTemplate>
  );
};

export default Login;
