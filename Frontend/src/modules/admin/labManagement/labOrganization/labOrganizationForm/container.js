import React, { useState, useContext, useEffect, Fragment } from 'react';
import { useRouteMatch, useHistory } from 'react-router';
import service from '../../services/labManagement.service';
import NotificationContext from '../../../../../shared/modules/notification/context';
import LabOrganizationPage from './page';
import CustomSpinner from '../../../../../shared/atoms/spinner';

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
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [formData, setFormData] = useState(null);
  const notification = useContext(NotificationContext);
  const match = useRouteMatch();
  const history = useHistory();

  const labOrganizationFormDataToModel = values => {
    const model = {
      name: values.labName,
      businessContact: {
        contactName: values.bussinessContactName,
        designation: values.bussinessDesignation,
        phone: values.bussinessPhone,
        email: values.bussinessEmail,
      },
      technicalContact: {
        contactName: values.technicalContactName,
        designation: values.technicalDesignation,
        phone: values.technicalPhone,
        email: values.technicalEmail,
      },
      financeContact: {
        contactName: values.financeContactName,
        designation: values.financeDesignation,
        phone: values.financePhone,
        email: values.financeEmail,
      },
    };
    if (match.params.id) model.labOrgId = formData.labOrgId;
    return model;
  };

  const labOrganizationModelToFormData = data => {
    const model = {
      labOrgId: data._id,
      labName: data.name,
      bussinessContactName: data.businessContact.contactName,
      bussinessDesignation: data.businessContact.designation,
      bussinessPhone: data.businessContact.phone,
      bussinessEmail: data.businessContact.email,
      technicalContactName: data.technicalContact.contactName,
      technicalDesignation: data.technicalContact.designation,
      technicalPhone: data.technicalContact.phone,
      technicalEmail: data.technicalContact.email,
      financeContactName: data.financeContact.contactName,
      financeDesignation: data.financeContact.designation,
      financePhone: data.financeContact.phone,
      financeEmail: data.financeContact.email,
    };
    setFormData(model);
  };

  const getLaborganizationById = async id => {
    setShowPageLoader(true);
    try {
      const { data } = await service.getLabOrganizationById(id);
      if (data && data._id) {
        labOrganizationModelToFormData(data);
      }
      setShowPageLoader(false);
    } catch (error) {
      notification.setNotification(
        {
          type: 'error',
          message: error.data && error.data.message ? error.data.message : error.message,
        },
        true
      );
      setShowPageLoader(false);
    }
  };

  useEffect(() => {
    // applicationContext.setHeading('Bla');
    if (match.params && match.params.id) {
      getLaborganizationById(match.params.id);
    }
  }, [match.params.id]);

  const createOrganization = async values => {
    const payload = labOrganizationFormDataToModel(values);
    try {
      const { data, message } = await service.createLabOrganization(payload);
      if (data && data._id) {
        notification.setNotification(
          {
            type: 'success',
            message,
          },
          true
        );
        history.push('/');
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

  const updateOrganization = async values => {
    const payload = labOrganizationFormDataToModel(values);
    try {
      const { message } = await service.updateLabOrganization(payload);
      notification.setNotification(
        {
          type: 'success',
          message,
        },
        true
      );
      history.push('/');
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
    if (match.params.id) {
      await updateOrganization(values);
    } else {
      await createOrganization(values);
    }
  };

  return (
    <Fragment>
      {showPageLoader && <CustomSpinner />}
      {!showPageLoader && (
        <LabOrganizationPage
          formData={formData}
          validationRules={VALIDATION_RULES}
          handleSubmit={handleSubmit}
          showLoader={showLoader}
        />
      )}
    </Fragment>
  );
};

export default LabOrganizationFormContainer;
