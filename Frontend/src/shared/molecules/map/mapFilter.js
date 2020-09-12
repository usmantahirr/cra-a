import React from 'react';
import { PageHeader, Descriptions, Form } from 'antd';
import { CustomSelectSmall } from '../../atoms/forms';

// import styles from './style.module.scss';

const MapFilter = props => {
  const { countryCode, country, visaType, filterState, onStateChange, onCityChange, onServiceChange } = props;

  const stateDropddown = (
    <Descriptions.Item label="State">
      <Form.Item
        name="labState"
        rules={[
          {
            required: true,
            message: 'Please select state',
          },
        ]}
      >
        <CustomSelectSmall options={filterState.states} value={filterState.selectedState} onChange={onStateChange} />
      </Form.Item>
    </Descriptions.Item>
  );

  return (
    <PageHeader ghost={false} className="map-filter">
      <Descriptions size="small" column={5}>
        <Descriptions.Item label="Country">{country}</Descriptions.Item>
        <Descriptions.Item label="Visa Type">{visaType}</Descriptions.Item>
        {countryCode ? stateDropddown : ''}
        <Descriptions.Item label="City">
          <Form.Item
            name="labCity"
            rules={[
              {
                required: true,
                message: 'Please select city',
              },
            ]}
          >
            <CustomSelectSmall options={filterState.cities} value={filterState.selectedCity} onChange={onCityChange} />
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="Lab Type">
          <Form.Item
            name="serviceType"
            rules={[
              {
                required: true,
                message: 'Please select serivce type',
              },
            ]}
          >
            <CustomSelectSmall
              options={filterState.serviceTypes}
              value={filterState.selectedService}
              onChange={onServiceChange}
            />
          </Form.Item>
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
};

export default MapFilter;
