import React, { useState } from 'react';
import SignupPage from '../../shared/pages/signupPage';

const SIGNUP_FORM_VALIDATION_RULES = {
  firstName: {
    name: 'fname',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your first name!',
      },
    ],
  },
  lastName: {
    name: 'lname',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your last name!',
      },
    ],
  },
  email: {
    name: 'email',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        type: 'email',
        message: 'E-mail is not valid!',
      },
      {
        required: true,
        message: 'Please enter your E-mail!',
      },
    ],
  },
  mobile: {
    name: 'mobile',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        validator: (rule, value) => {
          if (value) return Promise.resolve();
          if (value === false) return Promise.reject(new Error('Must be a valid mobile number!'));
          return Promise.reject(new Error('Please enter your mobile number!'));
        },
      },
    ],
  },
  password: {
    name: 'password',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your password!',
      },
      {
        pattern: new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{6,}/g),
        message: 'Password must contain atleast 6 characters, 1 upper case letter and 1 number.',
      },
    ],
  },
  confirmPassword: {
    name: 'cpassword',
    validateTrigger: ['onChange', 'onBlur'],
    dependencies: ['password'],
    rules: [
      {
        required: true,
        message: 'Please confirm your password!',
      },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('The two passwords that you entered do not match!'));
        },
      }),
    ],
  },
};

const VERIFICATION_FORM_VALIDATION_RULES = {
  otp: {
    name: 'otp',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter OTP!',
      },
      {
        min: 6,
        message: 'OTP must be of minimum 6 digits!',
      },
      {
        max: 6,
        message: 'OTP must be of maximum 6 digits!',
      },
    ],
  },
  pinNumber: {
    name: 'pinNumber',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter pin number!',
      },
      {
        min: 6,
        message: 'Pin number must be of minimum 6 digits!',
      },
      {
        max: 6,
        message: 'Pin number must be of maximum 6 digits!',
      },
    ],
  },
};

const SignupContainer = () => {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const handleSubmit = values => {
    JSON.stringify(values);
    setShowOTPModal(true);
  };
  const handleVerifySubmit = values => {
    JSON.stringify(values);
  };

  return (
    <SignupPage
      validationRules={SIGNUP_FORM_VALIDATION_RULES}
      verificationFormValidationRules={VERIFICATION_FORM_VALIDATION_RULES}
      handleSubmit={handleSubmit}
      handleVerifySubmit={handleVerifySubmit}
      showOTPModal={showOTPModal}
      setShowOTPModal={setShowOTPModal}
    />
  );
};

export default SignupContainer;
