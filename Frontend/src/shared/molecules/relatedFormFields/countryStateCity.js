import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import service from '../../services/shared.service';
import CustomSelect from '../../atoms/forms/select';
import { CustomTextInput } from '../../atoms/forms';

const CountryStateCity = props => {
  const { form, country, city, state, zipCode, isDesitination } = props;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showState, setShowState] = useState(false);

  const fetchCountries = async () => {
    try {
      const { data } = await service.getCountries();
      if (data && data.length > 0) {
        if (isDesitination) {
          setCountries(
            data.filter(c => {
              return c.isDestination === true;
            })
          );
        } else {
          setCountries(data);
        }
      } else setCountries([]);
      // form.setFieldsValue({
      //   [country.name]: { value: '5f589189175c69424c936728' },
      // });
    } catch (error) {
      setCountries([]);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

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
    if (e && e.value) {
      fetchCitiesByState(e.value);
    }
  };

  const renderCountries = () => {
    const { name, placeholder } = country;
    return (
      <Col span={12}>
        <Form.Item
          className="custom-item"
          name={name}
          label={placeholder}
          rules={[
            {
              required: true,
              message: 'Please select your country',
            },
          ]}
        >
          <CustomSelect
            showSearch
            allowClear
            labelInValue
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={onCountryChange}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            options={countries.map(c => ({ id: c._id, text: c.name, value: c._id }))}
          />
        </Form.Item>
      </Col>
    );
  };

  const renderStates = () => {
    const { name, placeholder } = state;
    return (
      showState && (
        <Col span={12}>
          <Form.Item
            className="custom-item"
            name={name}
            label={placeholder}
            rules={[
              {
                required: true,
                message: 'Please select your state',
              },
            ]}
          >
            <CustomSelect
              showSearch
              allowClear
              labelInValue
              placeholder={placeholder}
              optionFilterProp="children"
              onChange={onStateChange}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              options={states.map(c => ({ id: c._id, text: c.name, value: c._id }))}
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
        <Col span={12}>
          <Form.Item
            className="custom-item"
            name={name}
            label={placeholder}
            rules={[
              {
                required: true,
                message: 'Please select your zip code',
              },
            ]}
          >
            <CustomTextInput placeholder={placeholder} type="number" />
          </Form.Item>
        </Col>
      )
    );
  };

  const renderCities = () => {
    const { placeholder, dependencies } = city;
    return (
      <Col span={12}>
        <Form.Item
          className="custom-item"
          {...city}
          label={placeholder}
          rules={[
            {
              required: true,
              message: 'Please select your city',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || !dependencies) {
                  return Promise.resolve();
                }
                if (
                  !value ||
                  (dependencies[0] && (!getFieldValue(dependencies[0]) || !getFieldValue(dependencies[0]).value))
                ) {
                  return Promise.resolve();
                }
                if (!value || (dependencies[0] && getFieldValue(dependencies[0]).value !== value.value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Source and desitination cannot be same'));
              },
            }),
          ]}
        >
          <CustomSelect
            showSearch
            allowClear
            labelInValue
            placeholder={placeholder}
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            options={cities.map(c => ({ id: c._id, text: c.name, value: c._id }))}
          />
        </Form.Item>
      </Col>
    );
  };

  return (
    <Row className="ant-row-padding">
      {renderCountries()}
      {renderStates()}
      {renderZipCode()}
      {renderCities()}
    </Row>
  );
};

export default CountryStateCity;
