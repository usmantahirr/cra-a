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
  const labs = inputLabs.map(data => {
    return {
      id: data._id,
      name: data.name,
      city: data.city,
      services: data.services,
      pos: {
        lat: Number(data.latitude),
        lng: Number(data.longitude),
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
