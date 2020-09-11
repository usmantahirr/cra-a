import React, { useState, Fragment, useEffect } from 'react';
import MapFilter from '../../molecules/map/mapFilter';
import Map from '../../molecules/map';
import CardRadio from '../../molecules/cardRadio';
import MapService from './labselectionService';
import { stateResponseMapper, cityResponseMapper, labsResponseMapper, serviceTypesMapper } from './mapper';

const LabSelection = props => {
  const { applicationFormData } = props;

  const {
    countryCode = 'USA',
    country = applicationFormData[0] ? applicationFormData[0].sourceCountry : '',
    visaType = 'Visit',
    countryId = applicationFormData[0] ? applicationFormData[0].sourceCountry : '',
    stateId = applicationFormData[0] ? applicationFormData[0].sourceState : '',
    cityId = applicationFormData[0] ? applicationFormData[0].sourceCity : '',
  } = props;

  const [selectedLab, setSelectedLab] = useState({});
  const [center, setCenter] = useState({ lat: 44.076613, lng: -98.362239833 });
  const [zoom, setZoom] = useState(13);
  const [infoOpen, setInfoOpen] = useState(false);
  const [filterState, setFilterState] = useState({
    allLab: [],
    states: [],
    cities: [],
    cityLabs: [],
    serviceTypes: [],
    selectedState: '',
    selectedCity: '',
    selectedService: '',
  });

  // map handlers
  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedLab(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }
    setTimeout(() => {
      setInfoOpen(true);
      // if you want to center the selected Marker
    }, 1000);

    setCenter(place.pos);
    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }
  };

  useEffect(() => {
    async function Init() {
      let { data: statesResponse = [] } = stateId ? await MapService.getStatesByCountry(countryId) : {};
      let { data: citiesResponse = [] } = await MapService.getCitiesByState(stateId);
      let { data: labsResponse = [] } = await MapService.getLabsByCity(cityId);

      statesResponse = stateResponseMapper(statesResponse);
      citiesResponse = cityResponseMapper(citiesResponse);
      labsResponse = labsResponseMapper(labsResponse);
      const serviceTypes = labsResponse[0] ? serviceTypesMapper(labsResponse) : [];

      setFilterState({
        allLabs: labsResponse,
        states: statesResponse,
        cities: citiesResponse,
        cityLabs: labsResponse,
        serviceTypes,
        selectedState: stateId,
        selectedCity: cityId,
        selectedService: '',
      });

      if (labsResponse[0]) {
        markerClickHandler(null, labsResponse[0]);
      }
    }
    Init();
  }, [countryId, stateId, cityId]);

  // dropdown handlers
  const onStateChange = async value => {
    let { data: citiesResponse } = await MapService.getCitiesByState(value);
    const firstCity = citiesResponse[0] ? citiesResponse[0]._id : '';

    let { data: labsResponse = [] } = firstCity ? await MapService.getLabsByCity(firstCity) : {};

    citiesResponse = cityResponseMapper(citiesResponse);
    labsResponse = labsResponseMapper(labsResponse);

    const firstLab = labsResponse[0] ? labsResponse[0].id : '';
    const serviceTypes = firstLab ? serviceTypesMapper(labsResponse) : [];

    setFilterState(prevState => {
      // eslint-disable-next-line
      return {
        ...prevState,
        allLabs: labsResponse,
        cities: citiesResponse,
        cityLabs: labsResponse,
        serviceTypes,
        selectedState: value,
        selectedCity: firstCity,
        selectedService: '',
      };
    });
    if (labsResponse[0]) {
      markerClickHandler(null, labsResponse[0]);
    }
  };

  const onCityChange = async value => {
    let { data: labsResponse } = await MapService.getLabsByCity(value);
    labsResponse = labsResponseMapper(labsResponse);

    const firstLab = labsResponse[0] ? labsResponse[0].id : '';
    const serviceTypes = firstLab ? serviceTypesMapper(labsResponse) : [];

    setFilterState(function(prevState) {
      return {
        ...prevState,
        allLabs: labsResponse,
        cityLabs: labsResponse,
        selectedCity: value,
        selectedService: '',
        serviceTypes,
      };
    });

    if (labsResponse[0]) {
      markerClickHandler(null, labsResponse[0]);
    }
  };

  const onServiceChange = async selected => {
    // const filteretLabs = filterState.cityLabs.filter(x=>x.);

    setFilterState(function(prevState) {
      return {
        ...prevState,
        selectedService: selected,
      };
    });
  };

  const onCardChange = value => {
    const labToSelect = filterState.cityLabs.filter(x => x.id === value.target.id);
    if (labToSelect.length) {
      markerClickHandler(null, labToSelect[0]);
    }
  };

  return countryId ? (
    <Fragment>
      <MapFilter
        countryCode={countryCode}
        country={country}
        visaType={visaType}
        onStateChange={onStateChange}
        onCityChange={onCityChange}
        onServiceChange={onServiceChange}
        filterState={filterState}
      />
      <CardRadio cartOptions={filterState.cityLabs} value={selectedLab.id || ''} onChange={onCardChange} />
      {filterState.cityLabs.length ? (
        <Map
          infoOpen={infoOpen}
          myPlaces={filterState.cityLabs}
          zoom={zoom}
          setSelectedPlace={setSelectedLab}
          center={center}
          selectedPlace={selectedLab}
          markerClickHandler={markerClickHandler}
        />
      ) : null}
    </Fragment>
  ) : null;
};

export default LabSelection;
