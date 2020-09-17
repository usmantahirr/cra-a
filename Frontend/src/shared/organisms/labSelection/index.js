import React, { useState, Fragment, useEffect } from 'react';
import { Row, Col } from 'antd';
import CustomScroll from 'react-custom-scroll';
import {
  stateResponseMapper,
  cityResponseMapper,
  labsResponseMapper,
  serviceTypesMapper,
  filterBySubArray,
  parsePropData,
  getState,
  getCity,
  getCardOptionObject,
  getFormField,
  getLab,
} from './mapper';
import MapFilter from '../../molecules/map/mapFilter';
import Map from '../../molecules/map';
import CardRadio from '../../molecules/cardRadio';
import MapService from './labselectionService';
import CustomSpinner from '../../atoms/spinner';

const LabSelection = props => {
  const { form, applicationFormData } = props;
  const { country, countryId, visaType, stateId, cityId } = parsePropData(props);

  // form.setFieldsValue({ "serviceType": stateId })
  const [showLoader, setShowLoader] = useState(false);
  const [mapRef, setMapRef] = useState(null);
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

    form.setFieldsValue({ lab: getCardOptionObject(place) });
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
    if (mapRef && mapRef.zoom !== 13) {
      setTimeout(() => {
        // eslint-disable-next-line
        const cZoom = zoom === 13 ? 12 : 13;
        setZoom(cZoom);
      }, 1000);
    }
  };

  useEffect(() => {
    async function Init() {
      setShowLoader(true);
      const formState = getFormField('labState', applicationFormData);
      const currentState = formState ? formState.value : stateId;
      let { data: statesResponse = [] } = currentState ? await MapService.getStatesByCountry(countryId) : {};

      // cities by country
      let { data: citiesResponse = [] } = currentState
        ? await MapService.getCitiesByState(currentState)
        : countryId && (await MapService.getCitiesByCountry(countryId));

      // labs by city
      const currentCityState = getFormField('labCity', applicationFormData);
      const currentCity = currentCityState ? currentCityState.value : cityId;

      let { data: labsResponse = [] } = currentCity ? await MapService.getLabsByCity(currentCity) : { labs: [] };

      statesResponse = stateResponseMapper(statesResponse);
      citiesResponse = cityResponseMapper(citiesResponse);
      labsResponse = labsResponseMapper(labsResponse);

      const serviceTypes = []; // labsResponse[0] ? serviceTypesMapper(labsResponse) : [];

      // checking selected lab if exist other wise select default
      const currentLabId = getFormField('lab', applicationFormData);
      const currentLab = currentLabId ? getLab(labsResponse, currentLabId) : labsResponse[0];
      setShowLoader(false);
      setFilterState({
        allLabs: labsResponse,
        states: statesResponse,
        cities: citiesResponse,
        cityLabs: labsResponse,
        serviceTypes,
        selectedState: currentState,
        selectedCity: currentCity,
        selectedService: '',
      });

      if (currentLab) {
        markerClickHandler(null, currentLab);
      }

      form.setFieldsValue({ labState: getState(statesResponse, currentState) });
      form.setFieldsValue({ labCity: getCity(citiesResponse, currentCity) });
      form.setFieldsValue({ serviceType: undefined });
    }
    Init();
  }, [countryId, stateId, cityId]);

  // dropdown handlers
  const onStateChange = async value => {
    let { data: citiesResponse } = await MapService.getCitiesByState(value.key);
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
        selectedState: value.key,
        selectedCity: firstCity,
        selectedService: '',
      };
    });
    if (labsResponse[0]) {
      markerClickHandler(null, labsResponse[0]);
    }
    form.setFieldsValue({ labState: value });
    form.setFieldsValue({ labCity: getCity(citiesResponse, firstCity) });
    form.setFieldsValue({ serviceType: '' });
  };

  const onCityChange = async value => {
    let { data: labsResponse } = await MapService.getLabsByCity(value.key);
    labsResponse = labsResponseMapper(labsResponse);

    const firstLab = labsResponse[0] ? labsResponse[0].id : '';
    const serviceTypes = firstLab ? serviceTypesMapper(labsResponse) : [];

    setFilterState(prevState => {
      return {
        ...prevState,
        allLabs: labsResponse,
        cityLabs: labsResponse,
        selectedCity: value.key,
        selectedService: '',
        serviceTypes,
      };
    });

    if (labsResponse[0]) {
      markerClickHandler(null, labsResponse[0]);
    }

    form.setFieldsValue({ labCity: value });
    form.setFieldsValue({ serviceType: '' });
  };
  // eslint-disable-next-line
  const onServiceChange = async selected => {
    let filteredLabs = [];
    setFilterState(prevState => {
      filteredLabs = filterBySubArray(prevState.allLabs, selected.key, 'services', '_id');
      return {
        ...prevState,
        cityLabs: filteredLabs,
        selectedService: selected.key,
      };
    });
    const selectedExist = filteredLabs.filter(x => x.id === selectedLab.id);
    const markSelected = selectedExist.length ? selectedExist[0] : filteredLabs[0] || null;

    if (markSelected) {
      markerClickHandler(null, markSelected);
    }
    form.setFieldsValue({ serviceType: selected });
  };

  const onCardChange = value => {
    const labToSelect = filterState.cityLabs.filter(x => x.id === value.target.id);
    if (labToSelect.length) {
      markerClickHandler(null, labToSelect[0]);
    }
  };

  return countryId && cityId ? (
    <Fragment>
      {showLoader ? <CustomSpinner /> : ''}
      <MapFilter
        countryCode={stateId}
        country={country}
        visaType={visaType}
        onStateChange={onStateChange}
        onCityChange={onCityChange}
        // onServiceChange={onServiceChange}
        filterState={filterState}
      />
      <div className="card-section">
        <Row className="ant-row-padding">
          <Col xs={24} md={12} lg={16}>
            <Map
              mapRef={mapRef}
              setMapRef={setMapRef}
              infoOpen={infoOpen}
              myPlaces={filterState.cityLabs}
              zoom={zoom}
              center={center}
              selectedPlace={selectedLab}
              markerClickHandler={markerClickHandler}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <div className="filter-state">
              <CustomScroll heightRelativeToParent="100%">
                <CardRadio
                  cartOptions={filterState.cityLabs}
                  // value={(selectedLab && selectedLab.id) || ''}
                  onChange={onCardChange}
                />
              </CustomScroll>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  ) : null;
};

export default LabSelection;
