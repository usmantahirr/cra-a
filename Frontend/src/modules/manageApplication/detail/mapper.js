import * as moment from 'moment';
import { DATE_FORMATE } from '../../../config';

export const parseDetailView = data => {
  return data;
};

export const data = {
  visaInfo: {
    sourceCountry: 'USA',
    sourceState: 'USA',
    sourceCity: 'USA',
    destinationCountry: 'USA',
    destinationState: 'USA',
    destinationCity: 'USA',
    emirate: 'USA',
    visaType: 'USA',
  },
  appInfo: {
    fullName: 'Asad',
    sureName: 'hussain',
    dateOfBirth: '12/12/1947',
    nationality: 'pakistani',
    passportNo: '23423424',
    passportExpiry: 'asda',
    nationalIdNumber: 'adad',
    nationalIdExpiry: 'adsad',
    gender: 'Male',
    country: 'pakistan',
    state: 'pakistan',
    city: 'pakistan',
    zipCode: 'pakistan',
    address: 'pakistan',
  },

  labInfo: {
    labName: 'DOW ME',
    labType: 'afasdf',
    labAddress: 'asdfasdf',
    serviceType: 'asdfa',
    appointmentDate: 'asdfasd',
    slot: 'asdfasf',
    sampleCollectionData: 'fasd',
  },
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
