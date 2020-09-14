import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import ChangePasswordPage from './changePasswordPage';
import service from './services/user.service';
import NotificationContext from '../../shared/modules/notification/context';

const VALIDATION_RULES = {
  oldPassword: {
    name: 'oldPassword',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your old password!',
      },
      {
        pattern: new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])\S{8,}/g),
        message:
          'Old password must contain atleast 8 characters, Atleast 1 upper case letter, Atleast 1 lower case letter, Atleast 1 special character and atleast 1 number.',
      },
    ],
  },
  newPassword: {
    name: 'newPassword',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your new password!',
      },
      {
        pattern: new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])\S{8,}/g),
        message:
          'New password must contain atleast 8 characters, Atleast 1 upper case letter, Atleast 1 lower case letter, Atleast 1 special character and atleast 1 number.',
      },
    ],
  },
  confirmPassword: {
    name: 'confirmPassword',
    validateTrigger: ['onChange', 'onBlur'],
    dependencies: ['password'],
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
          return Promise.reject(new Error('New password and confirm password do not match!'));
        },
      }),
    ],
  },
};

const ChangePasswordContainer = ({ history }) => {
  const [showLoader, setShowLoader] = useState(false);
  const notification = useContext(NotificationContext);
  const handleSubmit = async values => {
    setShowLoader(true);
    const payload = {
      // "user_Id": JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).accountIdentifier,
      old_password: values.oldPassword,
      new_password: values.newPassword,
    };
    try {
      const { message } = await service.changePassword(payload);
      notification.setNotification(
        {
          type: 'success',
          message,
        },
        true
      );
      history.goBack();
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

  return <ChangePasswordPage validationRules={VALIDATION_RULES} handleSubmit={handleSubmit} showLoader={showLoader} />;
};

export default withRouter(ChangePasswordContainer);
