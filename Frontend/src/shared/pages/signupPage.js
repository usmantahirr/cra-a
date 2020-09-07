import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';
import Button from '../atoms/buttons/index';
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
}) => {
  const [registerForm] = Form.useForm();
  const [otpForm] = Form.useForm();

  useEffect(() => {
    setShowOTPModal(showOTPModal);
  }, [showOTPModal]);

  const resendOTPEvent = () => {
    // console.log("***************Resend button pressed do stuff here *********************")
  };

  const onOTPComplete = () => {
    // console.log("completed")
  };

  const resendPinEvent = () => {
    // console.log("***************Resend button pressed do stuff here *********************")
  };

  const onPinComplete = () => {
    // console.log("completed")
  };

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
          <CustomTelInput />
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
          <Button type="primary" htmlType="submit" className="ant-btn-block ant-btn-lg">
            Register
          </Button>
        </Form.Item>
      </Form>
      <Modal destroyOnClose centered visible={showOTPModal} footer={null} onCancel={() => setShowOTPModal(false)}>
        <Form className="transbg-form" form={otpForm} name="verifyOTP" onFinish={handleVerifySubmit}>
          <InputCustom
            maxLength={6}
            placeholder="OTP"
            type="number"
            value="otp"
            validators={verificationFormValidationRules.otp}
            className="custom-control"
          />
          <Timer minutes={0.99} resendEvent={resendOTPEvent} onComplete={onOTPComplete} />
          <InputCustom
            maxLength={6}
            placeholder="Pin Number"
            type="number"
            value="pinNumber"
            validators={verificationFormValidationRules.pinNumber}
            className="custom-control"
          />
          <Timer minutes={0.99} resendEvent={resendPinEvent} onComplete={onPinComplete} />
          <Form.Item>
            <Button type="primary" htmlType="submit" className="ant-btn-block ant-btn-lg">
              Verify
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </AuthPageTemplate>
  );
};

export default Signup;
