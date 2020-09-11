// eslint-disable-next-line
export function stateResponseMapper(inputStates) {
  const states = inputStates.map(data => {
    return { id: data._id, key: data._id, value: data._id, text: data.name };
  });
  return (states && states.length && states) || [];
}
// eslint-disable-next-line
export function cityResponseMapper(inputCities) {
  const cities = inputCities.map(data => {
    return { id: data._id, key: data._id, value: data._id, text: data.name };
  });
  return (cities && cities.length && cities) || [];
}

// eslint-disable-next-line
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

export function serviceTypesMapper(services) {
  const types =
    services &&
    services.map(data => {
      return { id: data._id, key: data._id, value: data._id, text: data.name };
    });
  return (types && types.length && types) || [];
}
