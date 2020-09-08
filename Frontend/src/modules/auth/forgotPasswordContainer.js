import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import ForgotPasswordPage from '../../shared/pages/forgotPasswordPage';
import service from './services/auth.service';
import NotificationContext from '../../shared/modules/notification/context';

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
};

const ForgotPasswordContainer = () => {
  const [showLoader, setShowLoader] = useState(false);
  const notification = useContext(NotificationContext);

  const handleSubmit = async values => {
    setShowLoader(true);
    const payload = {
      email: values.email,
      mobile_number: values.mobile,
    };
    try {
      const { data, message } = await service.sendOTP(payload);
      if (data && data.ref_id) {
        notification.setNotification(
          {
            type: 'success',
            message,
          },
          true
        );
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

  return <ForgotPasswordPage validationRules={VALIDATION_RULES} handleSubmit={handleSubmit} showLoader={showLoader} />;
};

export default withRouter(ForgotPasswordContainer);
