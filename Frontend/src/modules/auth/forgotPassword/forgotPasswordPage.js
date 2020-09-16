import React, { Fragment } from 'react';
import { Form } from 'antd';
import AuthPageTemplate from '../../../shared/templates/AuthPageTemplate';
import InputCustom from '../../../shared/atoms/forms/input';
import Button from '../../../shared/atoms/buttons';
import Timer from '../../../shared/atoms/timer';

const ForgotPassword = ({ validationRules, handleSubmit, showLoader, resendPinEvent, formType, onCancel }) => {
  const [form] = Form.useForm();

  const renderSendEmailForm = () =>
    formType === 'SEND_EMAIL' && (
      <InputCustom
        placeholder="Email Address"
        type="email"
        value="email"
        validators={validationRules.email}
        className="custom-control"
      />
    );

  const renderVerfifyEmailForm = () =>
    formType === 'VERIFY_EMAIL' && (
      <div className="otp-timer">
        <InputCustom
          placeholder="Pin Number"
          type="number"
          value="pin"
          validators={validationRules.pin}
          className="custom-control"
        />
        <Timer
          minutes={1.99}
          resendEvent={() => {
            form.resetFields(['pin']);
            return resendPinEvent();
          }}
        />
      </div>
    );

  const renderResetPasswordForm = () =>
    formType === 'RESET_PASSWORD' && (
      <Fragment>
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
          value="confirmPassword"
          validators={validationRules.confirmPassword}
          className="custom-control"
        />
      </Fragment>
    );

  const setButtonText = () => {
    if (formType === 'SEND_EMAIL') return 'Send Email';
    if (formType === 'VERIFY_EMAIL') return 'Verify Email';
    if (formType === 'RESET_PASSWORD') return 'Reset Password';
    return '';
  };

  const renderSubmitButton = () => (
    <Form.Item>
      <Button loading={showLoader} type="primary" htmlType="submit" className="ant-btn-block ant-btn-lg">
        {setButtonText()}
      </Button>
    </Form.Item>
  );

  const renderCanceButton = () =>
    (formType === 'VERIFY_EMAIL' || formType === 'RESET_PASSWORD') && (
      <Form.Item>
        <Button
          disabled={showLoader}
          type="primary"
          onClick={event => {
            if (formType === 'VERIFY_EMAIL') form.resetFields(['pin']);
            if (formType === 'RESET_PASSWORD') form.resetFields(['pin', 'newPassword', 'confirmPassword']);
            return onCancel(event);
          }}
          className="ant-btn-block ant-btn-lg"
        >
          Cancel
        </Button>
      </Form.Item>
    );

  return (
    <AuthPageTemplate>
      {formType === 'VERIFY_EMAIL' && <p>Enter pin number sent to your email address</p>}
      <Form className="transbg-form" form={form} name="register" onFinish={handleSubmit}>
        {renderSendEmailForm()}
        {renderVerfifyEmailForm()}
        {renderResetPasswordForm()}
        {renderSubmitButton()}
        {renderCanceButton()}
      </Form>
    </AuthPageTemplate>
  );
};

export default ForgotPassword;
