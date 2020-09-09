import React from 'react';
import { Form } from 'antd';
import Button from '../atoms/buttons/index';
import InputCustom from '../atoms/forms/input';
import AuthPageTemplate from '../templates/AuthPageTemplate';

const ForgotPassword = ({ validationRules, handleSubmit, showLoader }) => {
  const [form] = Form.useForm();

  return (
    <AuthPageTemplate>
      <Form className="transbg-form" form={form} name="register" onFinish={handleSubmit}>
        <InputCustom
          placeholder="Email Address"
          type="email"
          value="email"
          validators={validationRules.email}
          className="custom-control"
        />
        <Form.Item>
          <Button loading={showLoader} type="primary" htmlType="submit" className="ant-btn-block ant-btn-lg">
            Send Email
          </Button>
        </Form.Item>
      </Form>
    </AuthPageTemplate>
  );
};

export default ForgotPassword;
