import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import service from '../../services/shared.service';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};

const CountryStateCity = props => {
  const { form, country, city, state } = props;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showState, setShowState] = useState(false);

  const fetchCoutries = async () => {
    try {
      const { data } = await service.getCountries();
      if (data && data.length > 0) setCountries(data);
      else setCountries([]);
    } catch (error) {
      setCountries([]);
    }
  };

  useEffect(() => {
    fetchCoutries();
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

  const onCountryChange = value => {
    form.setFieldsValue({
      [state.name]: undefined,
      [city.name]: undefined,
    });
    setStates([]);
    setCities([]);
    if (value) {
      const selected = countries.find(c => c._id === value);
      if (selected && selected.iso_code === 'USA') {
        setShowState(true);
        fetchStates(value);
      } else {
        setShowState(false);
        fetchCities(value);
      }
    } else {
      setShowState(false);
    }
  };

  const onStateChange = value => {
    form.setFieldsValue({
      [city.name]: undefined,
    });
    setCities([]);
    if (value) {
      fetchCities(value);
    }
  };

  const renderCountries = () => {
    const { name, placeholder } = country;
    return (
      <Form.Item
        {...formItemLayout}
        name={name}
        label={placeholder}
        rules={[
          {
            required: true,
            message: 'Please select your country',
          },
        ]}
      >
        <Select
          showSearch
          allowClear
          placeholder={placeholder}
          optionFilterProp="children"
          onChange={onCountryChange}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {countries &&
            countries.length > 0 &&
            countries.map(({ _id, name: label }) => {
              return (
                <Option key={_id} value={_id}>
                  {label}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
    );
  };

  const renderStates = () => {
    const { name, placeholder } = state;
    return (
      showState && (
        <Form.Item
          {...formItemLayout}
          name={name}
          label={placeholder}
          rules={[
            {
              required: true,
              message: 'Please select your state',
            },
          ]}
        >
          <Select
            showSearch
            allowClear
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={onStateChange}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {states &&
              states.length &&
              states.map(({ _id, name: label }) => {
                return (
                  <Option key={_id} value={_id}>
                    {label}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
      )
    );
  };

  const renderCities = () => {
    const { name, placeholder } = city;
    return (
      <Form.Item
        {...formItemLayout}
        name={name}
        label={placeholder}
        rules={[
          {
            required: true,
            message: 'Please select your city',
          },
        ]}
      >
        <Select
          showSearch
          allowClear
          placeholder={placeholder}
          optionFilterProp="children"
          // onChange={onCityChange}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {cities &&
            cities.length > 0 &&
            cities.map(({ _id, name: label }) => {
              return (
                <Option key={_id} value={_id}>
                  {label}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
    );
  };

  return (
    <React.Fragment>
      {renderCountries()}
      {renderStates()}
      {renderCities()}
    </React.Fragment>
  );
};

export default CountryStateCity;
