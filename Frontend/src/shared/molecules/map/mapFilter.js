import React from 'react';
import { PageHeader, Descriptions } from 'antd';
import { CustomSelect } from '../../atoms/forms';

const MapFilter = props => {
  const { country, visaType, filterState, onStateChange, onCityChange, onServiceChange } = props;

  return (
    <PageHeader ghost={false} title="Title">
      <Descriptions size="small" column={5}>
        <Descriptions.Item label="Country">{country}</Descriptions.Item>
        <Descriptions.Item label="Visa Type">{visaType}</Descriptions.Item>
        <Descriptions.Item label="State">
          <CustomSelect
            style={{ width: 120 }}
            options={filterState.states}
            value={filterState.selectedState}
            onChange={onStateChange}
          />
        </Descriptions.Item>
        <Descriptions.Item label="City">
          <CustomSelect
            style={{ width: 120 }}
            options={filterState.cities}
            value={filterState.selectedCity}
            onChange={onCityChange}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Lab Type" options={filterState.serviceTypes}>
          <CustomSelect
            style={{ width: 120 }}
            options={filterState.serviceTypes}
            value={filterState.selectedService}
            onChange={onServiceChange}
          />
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
};

export default MapFilter;
