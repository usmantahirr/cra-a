function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

export function stateResponseMapper(inputStates) {
  const states = inputStates.map(data => {
    return { id: data._id, key: data._id, value: data._id, text: data.name };
  });
  return (states && states.length && states) || [];
}

export function cityResponseMapper(inputCities) {
  const cities = inputCities.map(data => {
    return { id: data._id, key: data._id, value: data._id, text: data.name };
  });
  return (cities && cities.length && cities) || [];
}

export function labsResponseMapper(inputLabs) {
  const labs = inputLabs.labs.map(data => {
    return {
      id: data._id,
      name: data.name,
      currency: data.currency,
      feesAmount: data.feesAmount,
      feesTax: data.feesTax,
      labId: data.labId,
      // city: data.city,
      services: data.serviceTypes,
      pos: {
        lat: Number(data.latitude),
        lng: Number(data.logitude),
      },
    };
  });
  return (labs && labs.length && labs) || [];
}

export function serviceTypesMapper(labs) {
  let services = [];
  labs.forEach(element => {
    if (element.services && element.services.length) {
      const result = element.services.map(data => {
        return { id: data._id, key: data._id, value: data._id, text: data.name };
      });

      services.push(...result);
    }
  });
  services = removeDuplicates(services, 'id');
  return services;
}

export function filterBySubArray(labs, filterValue, arrayName = '', prop = '') {
  let items = [];
  items = labs.filter(element => element[arrayName].some(subElement => subElement[prop] === filterValue));
  return items;
}

const getFieldValues = (data, objectProp, prop) => {
  if (!data) {
    return '';
  }
  // eslint-disable-next-line
  return data ? (data[objectProp] ? data[objectProp][prop] || '' : '') : '';
};

export function parsePropData(props) {
  const { applicationFormData } = props;
  return {
    country: getFieldValues(applicationFormData, 'sourceCountry', 'label'),
    visaType: 'Visit',
    countryId: getFieldValues(applicationFormData, 'sourceCountry', 'value'),
    stateId: getFieldValues(applicationFormData, 'sourceState', 'value'),
    cityId: getFieldValues(applicationFormData, 'sourceCity', 'value'),
  };
}

export function getState(states, selectedState) {
  if (states.length) {
    return states.filter(x => x.id === selectedState)[0];
  }
  return undefined;
}

export function getCity(cities, selectedCity) {
  if (cities.length) {
    return cities.filter(x => x.id === selectedCity)[0];
  }
  return undefined;
}

export function getLab(labs, selectedLab) {
  if (labs.length) {
    return labs.find(x => x.id === selectedLab);
  }
  return undefined;
}

export function getServiceType(servicTypes, selectedServiceType) {
  if (servicTypes.length) {
    return servicTypes.filter(x => x.id === selectedServiceType);
  }
  return undefined;
}

export function getCardOptionObject(place) {
  const item = {
    labId: place.labId,
    name: place.name,
    currency: place.currency,
    feesAmount: place.feesAmount,
    feesTax: place.feesTax,
  };
  return JSON.stringify(item);
}

export function getFormField(local, formData) {
  if (local === 'lab') {
    if (formData.lab && Object.keys(formData.lab)) {
      return formData.lab.name;
    }
    return '';
  }
  return formData[local];
}
