import React, { useState, Fragment, useEffect } from 'react';
import { Row, Col } from 'antd';
import {
  stateResponseMapper,
  cityResponseMapper,
  labsResponseMapper,
  serviceTypesMapper,
  filterBySubArray,
  parsePropData,
} from './mapper';
import MapFilter from '../../molecules/map/mapFilter';
import Map from '../../molecules/map';
import CardRadio from '../../molecules/cardRadio';
import MapService from './labselectionService';

const LabSelection = props => {
  const { form } = props;
  const { country, countryId, visaType, stateId, cityId } = parsePropData(props);

  form.setFieldsValue({ labState: stateId });
  form.setFieldsValue({ labCity: cityId });
  // form.setFieldsValue({ "serviceType": stateId })

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
    form.setFieldsValue({ lab: place.id });

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
      const stateOrCountry = stateId || countryId;
      let { data: citiesResponse = [] } = await MapService.getCitiesByState(stateOrCountry);
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

    setFilterState(prevState => {
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
    let filteredLabs = [];
    setFilterState(prevState => {
      filteredLabs = filterBySubArray(prevState.allLabs, selected, 'services', '_id');
      return {
        ...prevState,
        cityLabs: filteredLabs,
        selectedService: selected,
      };
    });

    if (filteredLabs[0]) {
      markerClickHandler(null, filteredLabs[0]);
    }
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
        countryCode={stateId}
        country={country}
        visaType={visaType}
        onStateChange={onStateChange}
        onCityChange={onCityChange}
        onServiceChange={onServiceChange}
        filterState={filterState}
      />
      <div className="card-section">
        <Row gutter={[32, 32]}>
          <Col span={16}>
            <Map
              infoOpen={infoOpen}
              myPlaces={filterState.cityLabs}
              zoom={zoom}
              setSelectedPlace={setSelectedLab}
              center={center}
              selectedPlace={selectedLab}
              markerClickHandler={markerClickHandler}
            />
          </Col>
          <Col span={8}>
            <CardRadio cartOptions={filterState.cityLabs} value={selectedLab.id || ''} onChange={onCardChange} />
          </Col>
        </Row>
      </div>
    </Fragment>
  ) : null;
};

export default LabSelection;
