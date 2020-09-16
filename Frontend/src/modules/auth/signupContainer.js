import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import SignupPage from '../../shared/pages/signupPage';
import service from './services/auth.service';
import NotificationContext from '../../shared/modules/notification/context';
import { APPLICATION_HOME } from '../../config';

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
        pattern: new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])\S{8,}/g),
        message:
          'Password must contain atleast 8 characters, Atleast 1 upper case letter, Atleast 1 lower case letter, Atleast 1 special character and atleast 1 number.',
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
        min: 5,
        message: 'OTP must be of minimum 5 digits!',
      },
      {
        max: 5,
        message: 'OTP must be of maximum 5 digits!',
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
        min: 5,
        message: 'Pin number must be of minimum 5 digits!',
      },
      {
        max: 5,
        message: 'Pin number must be of maximum 5 digits!',
      },
    ],
  },
};

const SignupContainer = ({ history }) => {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showVerifyLoader, setShowVerifyLoader] = useState(false);
  const [user, setUser] = useState(null);
  const notification = useContext(NotificationContext);

  const handleSubmit = async values => {
    setShowLoader(true);
    const payload = {
      email: values.email,
      mobile_number: values.mobile,
    };
    try {
      const { data } = await service.sendOTP(payload);
      if (data && data.ref_id) {
        setUser({ ...values, ref_id: data.ref_id });
        // notification.setNotification(
        //   {
        //     type: 'success',
        //     message,
        //   },
        //   true
        // );
      }
      setShowLoader(false);
      setShowOTPModal(true);
    } catch (error) {
      notification.setNotification(
        {
          type: 'error',
          message: error.data && error.data.message ? error.data.message : error.message,
        },
        true
      );
      setShowLoader(false);
    }
  };

  const handleVerifySubmit = async values => {
    setShowVerifyLoader(true);
    const payload = {
      first_name: user.fname,
      last_name: user.lname,
      mobile_number: user.mobile,
      email: user.email,
      ref_id: user.ref_id,
      otp: values.otp,
      pin: values.pinNumber,
      password: user.password,
    };
    try {
      const { data, message } = await service.verifyOTP(payload);
      if (data.token && data.user) {
        notification.setNotification(
          {
            type: 'success',
            message,
          },
          true
        );
        localStorage.setItem('token', data.token.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('id_token', data.token.id_token);
        history.push(APPLICATION_HOME);
      }
      setShowVerifyLoader(false);
      setShowOTPModal(false);
    } catch (error) {
      notification.setNotification(
        {
          type: 'error',
          message: error.data && error.data.message ? error.data.message : error.message,
        },
        true
      );
      setShowVerifyLoader(false);
    }
  };

  const resendOTPEvent = async () => {
    const payload = {
      ref_id: user.ref_id,
    };
    try {
      const { data } = await service.resendOTP(payload);
      if (data) {
        // notification.setNotification(
        //   {
        //     type: 'success',
        //     message,
        //   },
        //   true
        // );
      }
    } catch (error) {
      notification.setNotification(
        {
          type: 'error',
          message: error.data && error.data.message ? error.data.message : error.message,
        },
        true
      );
    }
  };

  const resendPinEvent = async () => {
    const payload = {
      ref_id: user.ref_id,
    };
    try {
      const { data } = await service.resendPin(payload);
      if (data) {
        // notification.setNotification(
        //   {
        //     type: 'success',
        //     message,
        //   },
        //   true
        // );
      }
    } catch (error) {
      notification.setNotification(
        {
          type: 'error',
          message: error.data && error.data.message ? error.data.message : error.message,
        },
        true
      );
    }
  };

  return (
    <SignupPage
      validationRules={SIGNUP_FORM_VALIDATION_RULES}
      verificationFormValidationRules={VERIFICATION_FORM_VALIDATION_RULES}
      handleSubmit={handleSubmit}
      handleVerifySubmit={handleVerifySubmit}
      showOTPModal={showOTPModal}
      setShowOTPModal={setShowOTPModal}
      showLoader={showLoader}
      showVerifyLoader={showVerifyLoader}
      resendOTPEvent={resendOTPEvent}
      resendPinEvent={resendPinEvent}
    />
  );
};

export default withRouter(SignupContainer);
