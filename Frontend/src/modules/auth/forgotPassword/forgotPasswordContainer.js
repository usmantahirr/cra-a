import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import service from '../services/auth.service';
import NotificationContext from '../../../shared/modules/notification/context';
import ForgotPasswordPage from './forgotPasswordPage';
import { AUTH_PAGE } from '../../../config';

const VALIDATION_RULES = {
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
  pin: {
    name: 'pin',
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
  newPassword: {
    name: 'newPassword',
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
    name: 'confirmPassword',
    validateTrigger: ['onChange', 'onBlur'],
    dependencies: ['newPassword'],
    rules: [
      {
        required: true,
        message: 'Please confirm your password!',
      },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue('newPassword') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('The two passwords that you entered do not match!'));
        },
      }),
    ],
  },
};

const SignupContainer = ({ history }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [value, setValues] = useState(null);
  const [formType, setFormType] = useState('SEND_EMAIL');
  const notification = useContext(NotificationContext);

  const sendForgotPasswordPin = async values => {
    const payload = {
      email: values.email,
    };
    try {
      const { data } = await service.sendForgotPasswordPin(payload);
      if (data && data.ref_id) {
        setValues({ ...values, ref_id: data.ref_id });
        setFormType('VERIFY_EMAIL');
      }
      setShowLoader(false);
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

  const verifyForgotPasswordPin = async values => {
    setShowLoader(true);
    const payload = {
      ref_id: value.ref_id,
      pin: values.pin,
    };
    try {
      const { data } = await service.verifyForgotPasswordPin(payload);
      if (data) {
        setFormType('RESET_PASSWORD');
      }
      setShowLoader(false);
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

  const resendForgotPasswordPin = async () => {
    const payload = {
      ref_id: value.ref_id,
    };
    try {
      await service.resendForgotPasswordPin(payload);
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

  const resetPassword = async values => {
    const payload = {
      ref_id: value.ref_id,
      password: values.newPassword,
    };
    try {
      const { message } = await service.resetPassword(payload);
      notification.setNotification(
        {
          type: 'success',
          message,
        },
        true
      );
      history.push(AUTH_PAGE);
      setShowLoader(false);
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

  const handleSubmit = async values => {
    setShowLoader(true);
    if (formType === 'SEND_EMAIL') {
      await sendForgotPasswordPin(values);
    } else if (formType === 'VERIFY_EMAIL') {
      await verifyForgotPasswordPin(values);
    } else if (formType === 'RESET_PASSWORD') {
      await resetPassword(values);
    }
  };

  const onCancel = () => {
    if (formType === 'VERIFY_EMAIL') {
      setFormType('SEND_EMAIL');
    } else if (formType === 'RESET_PASSWORD') {
      setFormType('SEND_EMAIL');
    }
  };

  return (
    <ForgotPasswordPage
      validationRules={VALIDATION_RULES}
      handleSubmit={handleSubmit}
      showLoader={showLoader}
      resendPinEvent={resendForgotPasswordPin}
      formType={formType}
      onCancel={onCancel}
    />
  );
};

export default withRouter(SignupContainer);
