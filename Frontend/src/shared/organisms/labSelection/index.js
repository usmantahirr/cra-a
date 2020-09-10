import React, { useEffect, useState, Fragment } from 'react';
import MapFilter from '../../molecules/map/mapFilter';
import Map from '../../molecules/map';
import CardRadio from '../../molecules/cardRadio';
import MapService from './labselectionService';

const LabSelection = props => {
  const {
    country = 'Pakistan',
    visaType = 'Visit',
    countryId = '5f589189175c69424c936728',
    stateId = '5f58a1b58512ad44cccbf2d3',
    cityId = '5f58b1bf46e2f21ff4a105cf',
  } = props;

  const [selectedLab, setSelectedLab] = useState(null);
  const [center, setCenter] = useState({ lat: 44.076613, lng: -98.362239833 });
  const [zoom, setZoom] = useState(5);
  const [infoOpen, setInfoOpen] = useState(false);

  const [filterState, setFilterState] = useState({
    states: [],
    cities: [],
    cityLabs: [],
    serviceTypes: [],
  });

  // map handlers
  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedLab(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }
    // if you want to center the selected Marker
    setCenter(place.pos);
  };

  useEffect(() => {
    async function Init() {
      let { data: statesResponse } = await MapService.getStatesByCountry(countryId);
      let { data: citiesResponse } = await MapService.getCitiesByState(stateId);
      let { data: labsResponse } = await MapService.getLabsByCity(cityId);

      statesResponse = statesResponse.map(data => {
        return { id: data._id, key: data._id, value: data._id, text: data.name };
      });

      citiesResponse = citiesResponse.map(data => {
        return { id: data._id, key: data._id, value: data._id, text: data.name };
      });

      labsResponse = labsResponse.map(data => {
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

      const serviceTypes = labsResponse[0].services.map(data => {
        return { id: data._id, key: data._id, value: data._id, text: data.name };
      });

      const selectedService = serviceTypes.length > 0 ? serviceTypes[0].id : [];

      setFilterState({
        states: statesResponse,
        cities: citiesResponse,
        cityLabs: labsResponse,
        serviceTypes,
        selectedState: stateId,
        selectedCity: cityId,
        selectedService,
      });
      markerClickHandler(null, labsResponse[0]);
    }
    Init();
  }, [countryId, stateId, cityId]);

  // dropdown handlers
  const onStateChange = async () => {
    let { data: statesResponse } = await MapService.getStatesByCountry(countryId);
    let { data: citiesResponse } = await MapService.getCitiesByState(stateId);
    let { data: labsResponse } = await MapService.getLabsByCity(cityId);

    statesResponse = statesResponse.map(data => {
      return { id: data._id, key: data._id, value: data._id, text: data.name };
    });

    citiesResponse = citiesResponse.map(data => {
      return { id: data._id, key: data._id, value: data._id, text: data.name };
    });

    labsResponse = labsResponse.map(data => {
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

    const serviceTypes = labsResponse[0].services.map(data => {
      return { id: data._id, key: data._id, value: data._id, text: data.name };
    });

    setFilterState(prevState => {
      // eslint-disable-next-line
      return {
        ...prevState,
        states: statesResponse,
        cities: citiesResponse,
        cityLabs: labsResponse,
        serviceTypes,
        selectedState: statesResponse[0].id,
        selectedCity: citiesResponse[0].id,
        selectedService: serviceTypes[0].id,
      };
    });

    markerClickHandler(null, labsResponse[0]);
  };

  const onCityChange = async () => {
    let { data: citiesResponse } = await MapService.getCitiesByState(stateId);
    let { data: labsResponse } = await MapService.getLabsByCity(cityId);

    citiesResponse = citiesResponse.map(data => {
      return { id: data._id, key: data._id, value: data._id, text: data.name };
    });

    labsResponse = labsResponse.map(data => {
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

    const serviceTypes = labsResponse[0].services.map(data => {
      return { id: data._id, key: data._id, value: data._id, text: data.name };
    });
    setFilterState(function(prevState) {
      return {
        ...prevState,
        cities: citiesResponse,
        cityLabs: labsResponse,
        selectedCity: citiesResponse[0].id,
        selectedService: serviceTypes[0].id,
      };
    });

    markerClickHandler(null, labsResponse[0]);
  };

  const onServiceChange = async selected => {
    setFilterState(function(prevState) {
      return {
        ...prevState,
        selectedService: selected,
      };
    });
  };

  return (
    <Fragment>
      <MapFilter
        country={country}
        visaType={visaType}
        onStateChange={onStateChange}
        onCityChange={onCityChange}
        onServiceChange={onServiceChange}
        filterState={filterState}
      />
      <CardRadio cartOptions={filterState.cityLabs} />
      <Map
        infoOpen={infoOpen}
        myPlaces={filterState.cityLabs}
        zoom={zoom}
        setSelectedPlace={setSelectedLab}
        center={center}
        selectedPlace={selectedLab}
        markerClickHandler={markerClickHandler}
      />
    </Fragment>
  );
};

export default LabSelection;
