import React from 'react';
import { Form } from 'antd';
import { useHistory } from 'react-router';

import AuthPageTemplate from '../../shared/templates/AuthPageTemplate';
import Button from '../../shared/atoms/buttons';
import InputCustom from '../../shared/atoms/forms/input';

const ChangePassword = ({ validationRules, handleSubmit, showLoader }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  return (
    <AuthPageTemplate showSalutationContainer={false}>
      <Form className="transbg-form" form={form} name="changePassword" onFinish={handleSubmit}>
        <InputCustom
          placeholder="Old Password"
          type="password"
          value="oldPassword"
          validators={validationRules.oldPassword}
          className="custom-control"
        />
        <InputCustom
          placeholder="New Password"
          type="password"
          value="newPassword"
          validators={validationRules.newPassword}
          className="custom-control"
        />
        <InputCustom
          placeholder="Confirm Password"
          type="password"
          value="changePassword"
          validators={validationRules.confirmPassword}
          className="custom-control"
        />
        <Form.Item>
          <Button loading={showLoader} type="primary" htmlType="submit" className="ant-btn-block ant-btn-lg">
            Apply Changes
          </Button>
        </Form.Item>
        <Form.Item>
          <Button className="ant-btn-block ant-btn-lg" onClick={() => history.goBack()}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </AuthPageTemplate>
  );
};

export default ChangePassword;
