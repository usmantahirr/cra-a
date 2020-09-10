import React, { useEffect, useState, Fragment } from 'react';
import MapFilter from '../../molecules/map/mapFilter';
import Map from '../../molecules/map';
import CardRadio from '../../molecules/cardRadio';
import MapService from './labselectionService';
import { stateResponseMapper, cityResponseMapper, labsResponseMapper, serviceTypesMapper } from './mapper';

const LabSelection = props => {
  const {
    countryCode = 'USA',
    country = 'USA',
    visaType = 'Visit',
    countryId = '5f589189175c69424c936728',
    stateId = '5f58a1b58512ad44cccbf2d3',
    cityId = '5f58b1bf46e2f21ff4a105cf',
  } = props;

  const [selectedLab, setSelectedLab] = useState({});
  const [center, setCenter] = useState({ lat: 44.076613, lng: -98.362239833 });
  const [zoom, setZoom] = useState(15);
  const [infoOpen, setInfoOpen] = useState(false);

  const [filterState, setFilterState] = useState({
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
      // setInfoOpen(false);
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
      let { data: statesResponse = [] } = stateId ? await MapService.getStatesByCountry(countryId) : {};
      let { data: citiesResponse = [] } = await MapService.getCitiesByState(stateId);
      let { data: labsResponse = [] } = await MapService.getLabsByCity(cityId);

      statesResponse = stateResponseMapper(statesResponse);
      citiesResponse = cityResponseMapper(citiesResponse);
      labsResponse = labsResponseMapper(labsResponse);
      const serviceTypes = labsResponse[0] ? serviceTypesMapper(labsResponse[0].services) : [];
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
    const serviceTypes = firstLab ? serviceTypesMapper(labsResponse[0].services) : [];

    setFilterState(prevState => {
      // eslint-disable-next-line
      return {
        ...prevState,
        cities: citiesResponse,
        cityLabs: labsResponse,
        serviceTypes,
        selectedState: value,
        selectedCity: firstCity,
        selectedService: serviceTypes && serviceTypes.length ? serviceTypes[0].id : '',
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
    const serviceTypes = firstLab ? serviceTypesMapper(labsResponse[0].services) : [];

    setFilterState(function(prevState) {
      return {
        ...prevState,
        cityLabs: labsResponse,
        selectedCity: value,
        selectedService: serviceTypes && serviceTypes.length ? serviceTypes[0].id : '',
      };
    });

    if (labsResponse[0]) {
      markerClickHandler(null, labsResponse[0]);
    }
  };

  const onServiceChange = async selected => {
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

  return (
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
