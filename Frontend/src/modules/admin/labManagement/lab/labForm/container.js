import React, { useState, useContext, useEffect, Fragment } from 'react';
import { useRouteMatch, useHistory } from 'react-router';
import * as moment from 'moment';
import service from '../../services/labManagement.service';
import NotificationContext from '../../../../../shared/modules/notification/context';
import LabPage from './page';
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
  labGroup: {
    name: 'labGroup',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please select lab group!',
      },
    ],
  },
  labAddress: {
    name: 'labAddress',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Please enter your lab address!',
      },
    ],
  },
  email: {
    name: 'email',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        type: 'email',
        message: 'Lab E-mail is not valid!',
      },
      {
        required: true,
        message: 'Please enter lab E-mail!',
      },
    ],
  },
  phone: {
    name: 'phone',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        validator: (rule, value) => {
          if (value) return Promise.resolve();
          if (value === false) return Promise.reject(new Error('Must be a valid phone number!'));
          return Promise.reject(new Error('Please enter lab phone number!'));
        },
      },
    ],
  },
  latitude: {
    name: 'latitude',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Latitute is required!',
      },
      {
        pattern: new RegExp(/^(-?\d+(\.\d+)?)$/),
        message: 'Must be a valid latitiude!',
      },
    ],
  },
  longitude: {
    name: 'longitude',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Longitude is required!',
      },
      {
        pattern: new RegExp(/^(-?\d+(\.\d+)?)$/),
        message: 'Must be a valid longitude!',
      },
    ],
  },
  weekStartDay: {
    name: 'weekStartDay',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Week start day is required!',
      },
    ],
  },
  weekEndDay: {
    name: 'weekEndDay',
    validateTrigger: ['onChange', 'onBlur'],
    dependencies: ['weekStartDay'],
    rules: [
      {
        required: true,
        message: 'Week end day is required!',
      },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue('weekStartDay') !== value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Week start day and week end day cannot be same!'));
        },
      }),
    ],
  },
  openingTime: {
    name: 'openingTime',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        message: 'Lab opening time is required!',
      },
    ],
  },
  closingTime: {
    name: 'closingTime',
    validateTrigger: ['onChange', 'onBlur'],
    dependencies: ['openingTime'],
    rules: [
      {
        required: true,
        message: 'Lab closing time is required!',
      },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          const openingTime = getFieldValue('openingTime');
          const parseTime = timeString => moment(timeString, 'HH:mm');
          if (!openingTime || !value || parseTime(openingTime).isBefore(parseTime(value), 'minute')) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Lab opening time and lab closing time cannot be same!'));
        },
      }),
    ],
  },
};

const LabOrganizationFormContainer = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [labGroups, setLabGroups] = useState([]);
  const [formData, setFormData] = useState(null);
  const notification = useContext(NotificationContext);
  const match = useRouteMatch();
  const history = useHistory();
  const countryStateCityZipCode = {
    country: {
      name: 'country',
      placeholder: 'Country',
    },
    state: {
      name: 'state',
      placeholder: 'State',
    },
    zipCode: {
      name: 'zipCode',
      placeholder: 'Zip Code',
    },
    city: {
      name: 'city',
      placeholder: 'City',
    },
  };

  const getLaborganizationsLookup = async () => {
    try {
      const { data } = await service.getLabOrganizationByLookup();
      if (data && data.length) {
        setLabGroups(data);
      }
    } catch (error) {
      notification.setNotification(
        {
          type: 'error',
          message: error.data && error.data.message ? error.data.message : error.message,
        },
        true
      );
      setLabGroups([]);
    }
  };

  useEffect(() => {
    getLaborganizationsLookup();
  }, []);

  const labFormDataToModel = values => {
    const model = {
      name: values.labName,
      labGroup: values.labGroup,
      countryFullName: values.country.value,
      countryShortName: values.country.key,
      city: values.city,
      address: values.labAddress,
      phone: values.phone,
      email: values.email,
      latitude: values.latitude, // "24.121212",
      logitude: values.longitude, // "67.121212",
      labWeekDays: {
        weekStartDay: values.weekStartDay,
        weekEndDay: values.weekEndDay,
      },
      labTimings: {
        openingTime: moment(values.openingTime).format('HH:mm:ss'),
        closingTime: moment(values.closingTime).format('HH:mm:ss'),
      },
      showContactInfo: values.informationVisible,
    };
    if (values.state) {
      model.state = values.state;
      model.zipCode = values.zipCode;
    }
    if (match.params.id) {
      model.labId = formData.labId;
      model.isLocked = formData.isLocked || false;
      model.isActive = formData.isActive || false;
    }
    return model;
  };

  const labModelToFormData = data => {
    const model = {
      labId: data._id,
      labName: data.name,
      labGroup: data.labGroup,
      country: {
        key: data.countryShortName,
        label: data.countryFullName,
        value: data.countryFullName,
      },
      city: data.city,
      labAddress: data.address,
      phone: data.phone,
      email: data.email,
      latitude: data.latitude, // "24.121212",
      longitude: data.logitude, // "67.121212",
      weekStartDay: data.labWeekDays.weekStartDay,
      weekEndDay: data.labWeekDays.weekEndDay,
      openingTime: moment(data.labTimings.openingTime, 'h:mm a'),
      closingTime: moment(data.labTimings.closingTime, 'h:mm a'),
      informationVisible: data.showContactInfo,
      isActive: data.isActive,
      isLocked: data.isLocked,
    };
    if (data.state) {
      model.state = data.state;
      model.zipCode = data.zipCode;
    }
    setFormData(model);
  };

  const getLabById = async id => {
    setShowPageLoader(true);
    try {
      const { data } = await service.getLabById(id);
      if (data && data._id) {
        labModelToFormData(data);
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
      getLabById(match.params.id);
    }
  }, [match.params.id]);

  const createLab = async values => {
    const payload = labFormDataToModel(values);
    try {
      const { data, message } = await service.createLab(payload);
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

  const updateLab = async values => {
    const payload = labFormDataToModel(values);
    try {
      const { message } = await service.updateLab(payload);
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
      await updateLab(values);
    } else {
      await createLab(values);
    }
  };

  return (
    <Fragment>
      {showPageLoader && <CustomSpinner />}
      {!showPageLoader && (
        <LabPage
          formData={formData}
          validationRules={VALIDATION_RULES}
          handleSubmit={handleSubmit}
          showLoader={showLoader}
          labGroups={labGroups}
          countryStateCityZipCode={countryStateCityZipCode}
        />
      )}
    </Fragment>
  );
};

export default LabOrganizationFormContainer;
