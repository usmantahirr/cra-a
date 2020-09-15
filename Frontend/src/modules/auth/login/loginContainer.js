import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import service from '../services/auth.service';
import NotificationContext from '../../../shared/modules/notification/context';
import LoginPage from './loginPage';
import { APPLICATION_HOME } from '../../../config';

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
  password: {
    name: 'password',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your password!',
      },
    ],
  },
};

const LoginContainer = ({ history }) => {
  const [showLoader, setShowLoader] = useState(false);
  const notification = useContext(NotificationContext);

  const handleSubmit = async values => {
    setShowLoader(true);
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const { data } = await service.login(payload);
      if (data.token && data.user) {
        localStorage.setItem('token', data.token.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('id_token', data.token.id_token);
        history.push(APPLICATION_HOME);
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

  return <LoginPage validationRules={VALIDATION_RULES} handleSubmit={handleSubmit} showLoader={showLoader} />;
};

export default withRouter(LoginContainer);
