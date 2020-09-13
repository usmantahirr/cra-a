import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';

import Button from '../atoms/buttons';
import InputCustom from '../atoms/forms/input';
import AuthPageTemplate from '../templates/AuthPageTemplate';
import CustomTelInput from '../atoms/inputs/customTelInput';
import Timer from '../atoms/timer';

const Signup = ({
  validationRules,
  handleSubmit,
  showOTPModal,
  setShowOTPModal,
  handleVerifySubmit,
  verificationFormValidationRules,
  showLoader,
  showVerifyLoader,
  resendOTPEvent,
  resendPinEvent,
}) => {
  const [registerForm] = Form.useForm();
  const [otpForm] = Form.useForm();

  useEffect(() => {
    setShowOTPModal(showOTPModal);
  }, [showOTPModal]);

  return (
    <AuthPageTemplate>
      <Form className="transbg-form" form={registerForm} name="register" onFinish={handleSubmit}>
        <InputCustom
          placeholder="First Name"
          type="text"
          value="fname"
          validators={validationRules.firstName}
          className="custom-control"
        />
        <InputCustom
          placeholder="Last Name"
          type="text"
          value="lname"
          validators={validationRules.lastName}
          className="custom-control"
        />
        <InputCustom
          placeholder="Email Address"
          type="email"
          value="email"
          validators={validationRules.email}
          className="custom-control"
        />
        <Form.Item {...validationRules.mobile} className="custom-item">
          <CustomTelInput className="custom-control" />
        </Form.Item>
        <InputCustom
          placeholder="Password"
          type="password"
          value="password"
          validators={validationRules.password}
          className="custom-control"
        />
        <InputCustom
          placeholder="Confirm Password"
          type="password"
          value="cpassword"
          validators={validationRules.confirmPassword}
          className="custom-control"
        />
        <Form.Item>
          <Button loading={showLoader} type="primary" htmlType="submit" className="ant-btn-block ant-btn-lg">
            Register
          </Button>
        </Form.Item>
      </Form>
      <Modal
        centered
        destroyOnClose
        visible={showOTPModal}
        footer={null}
        onCancel={() => {
          otpForm.resetFields();
          setShowOTPModal(false);
        }}
        className="custom-popup otp-popup"
        width={590}
      >
        <div className="custompopup-text">
          Please Enter Your OTP Sent To Your Mobile Number And Pin Number Sent To Your Email Address
        </div>
        <div className="custom-content-holder">
          <Form className="transbg-form" form={otpForm} name="verifyOTP" onFinish={handleVerifySubmit}>
            <div className="otp-timer">
              <InputCustom
                maxLength={6}
                placeholder="OTP"
                type="number"
                value="otp"
                validators={verificationFormValidationRules.otp}
                className="custom-control"
              />
              <Timer
                minutes={1.99}
                resendEvent={() => {
                  otpForm.resetFields(['otp']);
                  return resendOTPEvent();
                }}
              />
            </div>
            <div className="otp-timer">
              <InputCustom
                maxLength={6}
                placeholder="Pin Number"
                type="number"
                value="pinNumber"
                validators={verificationFormValidationRules.pinNumber}
                className="custom-control"
              />
              <Timer
                minutes={1.99}
                resendEvent={() => {
                  otpForm.resetFields(['pinNumber']);
                  return resendPinEvent();
                }}
              />
            </div>
            <Form.Item>
              <Button loading={showVerifyLoader} type="primary" htmlType="submit" className="ant-btn-block ant-btn-lg">
                Verify
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </AuthPageTemplate>
  );
};

export default Signup;
