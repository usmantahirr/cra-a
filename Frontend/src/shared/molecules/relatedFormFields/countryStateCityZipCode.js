import React, { useState, useEffect, Fragment } from 'react';
import { Form, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import service from '../../services/shared.service';
import CustomSelect from '../../atoms/forms/select';
import { CustomTextInput } from '../../atoms/forms';
import { getTranslation } from '../../utilities/index';

const CountryStateCityZipCode = props => {
  const [componentMounted, setComponentMounted] = useState(false);
  const { form, country, city, state, zipCode } = props;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showState, setShowState] = useState(false);
  const { t } = useTranslation();

  const fetchCountries = async () => {
    try {
      const { data } = await service.getCountries();
      if (data && data.length > 0) {
        setCountries(data);
        return data;
      }
      setCountries([]);
      return [];
    } catch (error) {
      setCountries([]);
      return [];
    }
  };

  const fetchStates = async id => {
    try {
      const { data } = await service.getStates(id);
      if (data && data.length > 0) setStates(data);
      else setStates([]);
    } catch (error) {
      setStates([]);
    }
  };

  const fetchCities = async id => {
    try {
      const { data } = await service.getCities(id);
      if (data && data.length > 0) setCities(data);
      else setCities([]);
    } catch (error) {
      setCities([]);
    }
  };

  const fetchCitiesByState = async id => {
    try {
      const { data } = await service.getCityByState(id);
      if (data && data.length > 0) setCities(data);
      else setCities([]);
    } catch (error) {
      setCities([]);
    }
  };

  useEffect(() => {
    setComponentMounted(true);
    async function fetchInitialLists() {
      const countryList = await fetchCountries();
      if (country && country.value) {
        const selected = countryList.find(c => c._id === country.value);
        if (selected && selected.isoCode === 'US') {
          setShowState(true);
          fetchStates(country.value);
          fetchCitiesByState(state.value);
          // form.setFieldsValue({
          //   [country.name]: country.value,
          //   [state.name]: state.value,
          //   [zipCode.name]: zipCode.value,
          //   [city.name]: city.value,
          // });
        } else {
          setShowState(false);
          fetchCities(country.value);
          // form.setFieldsValue({
          //   [country.name]: country.value,
          //   [city.name]: city.value,
          // });
        }
      }
    }

    if (componentMounted) {
      fetchInitialLists();
    }

    return () => {
      setComponentMounted(false);
    };
  }, [componentMounted]);

  const onCountryChange = e => {
    form.setFieldsValue({
      [state.name]: undefined,
      [city.name]: undefined,
    });
    setStates([]);
    setCities([]);
    if (e && e.value) {
      const selected = countries.find(c => c._id === e.value);
      if (selected && selected.isoCode === 'US') {
        setShowState(true);
        fetchStates(e.value);
      } else {
        setShowState(false);
        fetchCities(e.value);
      }
    } else {
      setShowState(false);
    }
  };

  const onStateChange = e => {
    form.setFieldsValue({
      [city.name]: undefined,
    });
    setCities([]);
    if (e) {
      fetchCitiesByState(e);
    }
  };

  const renderCountries = () => {
    const { name, placeholder } = country;
    return (
      <Col xs={24} md={12}>
        <Form.Item
          className="custom-item"
          name={name}
          label={getTranslation(placeholder, t)}
          validateTrigger={['onChange', 'onBlur']}
          rules={[
            {
              required: true,
              message: getTranslation('Please select your country', t),
            },
          ]}
        >
          <CustomSelect
            showSearch
            allowClear
            placeholder={getTranslation(placeholder, t)}
            labelInValue
            optionFilterProp="children"
            onChange={onCountryChange}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            options={countries.map(c => ({ id: c.isoCode, text: c.name, value: c.name }))}
          />
        </Form.Item>
      </Col>
    );
  };

  const renderStates = () => {
    const { name, placeholder } = state;
    return (
      showState && (
        <Col xs={24} md={12}>
          <Form.Item
            className="custom-item"
            name={name}
            validateTrigger={['onChange', 'onBlur']}
            label={getTranslation(placeholder, t)}
            rules={[
              {
                required: true,
                message: getTranslation('Please select your state', t),
              },
            ]}
          >
            <CustomSelect
              showSearch
              allowClear
              placeholder={getTranslation(placeholder, t)}
              optionFilterProp="children"
              onChange={onStateChange}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              options={states.map(c => ({ id: c._id, text: c.name, value: c.name }))}
            />
          </Form.Item>
        </Col>
      )
    );
  };

  const renderZipCode = () => {
    const { name, placeholder } = zipCode;
    return (
      showState && (
        <Col xs={24} md={12}>
          <Form.Item
            className="custom-item"
            name={name}
            validateTrigger={['onChange', 'onBlur']}
            label={getTranslation(placeholder, t)}
            rules={[
              {
                required: true,
                message: getTranslation('Please select your zip code', t),
              },
            ]}
          >
            <CustomTextInput placeholder={getTranslation(placeholder, t)} type="number" />
          </Form.Item>
        </Col>
      )
    );
  };

  const renderCities = () => {
    const { placeholder } = city;
    return (
      <Col xs={24} md={12}>
        <Form.Item
          className="custom-item"
          {...city}
          validateTrigger={['onChange', 'onBlur']}
          label={getTranslation(placeholder, t)}
          rules={[
            {
              required: true,
              message: getTranslation('Please select your city', t),
            },
          ]}
        >
          <CustomSelect
            showSearch
            allowClear
            placeholder={getTranslation(placeholder, t)}
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            options={cities.map(c => ({ id: c._id, text: c.name, value: c.name }))}
          />
        </Form.Item>
      </Col>
    );
  };

  return (
    <Fragment>
      {renderCountries()}
      {renderStates()}
      {renderZipCode()}
      {renderCities()}
    </Fragment>
  );
};

export default CountryStateCityZipCode;
