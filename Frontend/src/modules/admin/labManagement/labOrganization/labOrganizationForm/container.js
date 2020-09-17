import React, { useState, useContext, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router';
import service from '../../services/labManagement.service';
import NotificationContext from '../../../../../shared/modules/notification';
import LabOrganizationPage from './page';

const VALIDATION_RULES = {
  labName: {
    name: 'labName',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your lab name!',
      },
    ],
  },
  bussinessContactName: {
    name: 'bussinessContactName',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your bussiness point of contact name!',
      },
    ],
  },
  bussinessDesignation: {
    name: 'bussinessDesignation',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your bussiness designation!',
      },
    ],
  },
  bussinessEmail: {
    name: 'bussinessEmail',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        type: 'email',
        message: 'Bussiness E-mail is not valid!',
      },
      {
        required: true,
        message: 'Please enter your bussiness E-mail!',
      },
    ],
  },
  bussinessPhone: {
    name: 'bussinessPhone',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        validator: (rule, value) => {
          if (value) return Promise.resolve();
          if (value === false) return Promise.reject(new Error('Must be a valid bussiness phone number!'));
          return Promise.reject(new Error('Please enter your bussiness phone number!'));
        },
      },
    ],
  },
  technicalContactName: {
    name: 'technicalContactName',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your technical point of contact name!',
      },
    ],
  },
  technicalDesignation: {
    name: 'technicalDesignation',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your technical designation!',
      },
    ],
  },
  technicalEmail: {
    name: 'technicalEmail',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        type: 'email',
        message: 'Technical E-mail is not valid!',
      },
      {
        required: true,
        message: 'Please enter your technical E-mail!',
      },
    ],
  },
  technicalPhone: {
    name: 'technicalPhone',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        validator: (rule, value) => {
          if (value) return Promise.resolve();
          if (value === false) return Promise.reject(new Error('Must be a valid technical phone number!'));
          return Promise.reject(new Error('Please enter your technical phone number!'));
        },
      },
    ],
  },
  financeContactName: {
    name: 'financeContactName',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your finance point of contact name!',
      },
    ],
  },
  financeDesignation: {
    name: 'financeDesignation',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your finance designation!',
      },
    ],
  },
  financeEmail: {
    name: 'financeEmail',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        type: 'email',
        message: 'Finance E-mail is not valid!',
      },
      {
        required: true,
        message: 'Please enter your finance E-mail!',
      },
    ],
  },
  financePhone: {
    name: 'financePhone',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        validator: (rule, value) => {
          if (value) return Promise.resolve();
          if (value === false) return Promise.reject(new Error('Must be a valid finance phone number!'));
          return Promise.reject(new Error('Please enter your finance phone number!'));
        },
      },
    ],
  },
};

const LabOrganizationFormContainer = () => {
  const [showLoader, setShowLoader] = useState(false);
  const notification = useContext(NotificationContext);
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    // applicationContext.setHeading('Bla');
    if (match.params && match.params.id) {
      history.push('/');
    }
  }, [match.params.id]);

  const handleSubmit = async values => {
    setShowLoader(true);
    const payload = {
      email: values.email,
      mobile_number: values.mobile,
    };
    try {
      const { data } = await service.sendOTP(payload);
      if (data) {
        notification.setNotification(
          {
            type: 'success',
            message: 'haha',
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

  return <LabOrganizationPage validationRules={VALIDATION_RULES} handleSubmit={handleSubmit} showLoader={showLoader} />;
};

export default LabOrganizationFormContainer;
