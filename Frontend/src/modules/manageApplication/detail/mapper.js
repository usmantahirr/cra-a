import * as moment from 'moment';
import { DATE_FORMATE } from '../../../config';

const getFieldValues = (data, objectProp, prop) => {
  if (!data) {
    return '';
  }

  if (!prop) {
    return (data && data[objectProp]) || '';
  }

  // eslint-disable-next-line
  return data ? (data[objectProp] ? data[objectProp][prop] || '' : '') : '';
};

export const parseDetailView = (data, lab) => {
  if (!data) {
    return {};
  }
  return {
    applicationId: data.applicationId || '',
    status: data.status || '',
    testResult: data.testResult || '',
    attachments: data.attachments,
    visaInfo: {
      sourceCountry: getFieldValues(data.application_data, 'sourceCountry', 'value'),
      sourceState: getFieldValues(data.application_data, 'sourceState', 'value'),
      sourceCity: getFieldValues(data.application_data, 'sourceCity', 'value'),
      destinationCountry: getFieldValues(data.application_data, 'destCountry', 'value'),
      destinationState: getFieldValues(data.application_data, 'destState', 'value'),
      destinationCity: getFieldValues(data.application_data, 'destCity', 'value'),
      emirate: getFieldValues(data.application_data, 'emiratesId'),
      visaType: getFieldValues(data.application_data, 'visaType'),
    },
    appInfo: {
      fullName: getFieldValues(data.application_data, 'name'),
      sureName: getFieldValues(data.application_data, 'surName'),
      dateOfBirth: getFieldValues(data.application_data, 'dob'),
      nationality: getFieldValues(data.application_data, 'nationality', 'value'),
      passportNo: getFieldValues(data.application_data, 'passportId'),
      passportExpiry: getFieldValues(data.application_data, 'passportExpiry'),
      nationalIdNumber: getFieldValues(data.application_data, 'nationalId'),
      nationalIdExpiry: getFieldValues(data.application_data, 'nationalIdExpiry'),
      gender: getFieldValues(data.application_data, 'gender'),
      country: getFieldValues(data.application_data, 'country', 'value'),
      state: getFieldValues(data.application_data, 'state', 'value'),
      city: getFieldValues(data.application_data, 'city', 'value'),
      zipCode: getFieldValues(data.application_data, 'zipCode'),
      address: getFieldValues(data.application_data, 'address'),
    },
    labInfo: {
      labName: getFieldValues(data.application_data, 'lab', 'name'),
      labAddress: (lab && lab.address) || '',
      serviceType: getFieldValues(data.application_data, 'serviceType'),
      appointmentDate: '-',
      slot: '-',
      sampleCollectionData: '-',
    },
    labFees: getFieldValues(data.application_data, 'lab', 'feesAmount'),
    labCurrency: getFieldValues(data.application_data, 'lab', 'currency'),
  };
};

export const viewFields = {
  visaInformation: [
    {
      label: 'Source Country',
      name: 'sourceCountry',
      order: 1,
    },
    {
      label: 'Source State',
      name: 'sourceState',
      order: 2,
    },
    {
      label: 'Source City',
      name: 'sourceCity',
      order: 3,
    },
    {
      label: 'Destination Country',
      name: 'destinationCountry',
      order: 4,
    },
    {
      label: 'Destination State',
      name: 'destinationState',
      order: 4,
    },
    {
      label: 'Destination City',
      name: 'destinationCity',
      order: 4,
    },
    {
      label: 'Emirate',
      name: 'emirate',
      order: 4,
    },
    {
      label: 'Visa Type',
      name: 'visaType',
      order: 4,
    },
  ],
  applicationInformation: [
    {
      label: 'Full Name',
      name: 'fullName',
      order: 1,
    },
    {
      label: 'Sure Name',
      name: 'sureName',
      order: 2,
    },
    {
      label: 'Date Of Birth',
      name: 'dateOfBirth',
      order: 3,
    },
    {
      label: 'Nationality',
      name: 'nationality',
      order: 4,
    },
    {
      label: 'Passport Number',
      name: 'passportNo',
      order: 5,
    },
    {
      label: 'Passport Expiry',
      name: 'passportExpiry',
      order: 6,
    },
    {
      label: 'National Id Number',
      name: 'nationalIdNumber',
      order: 7,
    },
    {
      label: 'National Id Expiry',
      name: 'nationalIdExpiry',
      order: 8,
    },
    {
      label: 'Gender',
      name: 'gender',
      order: 9,
    },
    {
      label: 'Country',
      name: 'country',
      order: 10,
    },
    {
      label: 'State',
      name: 'state',
      order: 11,
    },
    {
      label: 'City',
      name: 'city',
      order: 12,
    },
    {
      label: 'Zip Code',
      name: 'zipCode',
      order: 13,
    },
    {
      label: 'Address',
      name: 'address',
      order: 14,
    },
  ],
  labInformation: [
    {
      label: 'Lab Name',
      name: 'labName',
      order: 1,
    },
    {
      label: 'Lab Type',
      name: 'labType',
      order: 2,
    },
    {
      label: 'Lab Address',
      name: 'labAddress',
      order: 3,
    },
    {
      label: 'Service Type',
      name: 'serviceType',
      order: 4,
    },
    {
      label: 'Appointment Date',
      name: 'appointmentDate',
      order: 5,
    },
    {
      label: 'Slot',
      name: 'slot',
      order: 6,
    },
    {
      label: 'Sample Collection Data',
      name: 'sampleCollectionData',
      order: 7,
    },
  ],
};

export const getField = field => {
  if (moment.isMoment(field)) {
    return field.format(DATE_FORMATE);
  }
  return field;
};
