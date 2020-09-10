import React from 'react';
import { PageHeader, Descriptions } from 'antd';
import { CustomSelect } from '../../atoms/forms';
import { STATE_SKIP_BY_COUNTRY } from '../../../config';

const MapFilter = props => {
  const { countryCode, country, visaType, filterState, onStateChange, onCityChange, onServiceChange } = props;

  const stateDropddown = (
    <Descriptions.Item label="State">
      <CustomSelect
        style={{ width: 120 }}
        options={filterState.states}
        value={filterState.selectedState}
        onChange={onStateChange}
      />
    </Descriptions.Item>
  );

  return (
    <PageHeader ghost={false} title="Title">
      <Descriptions size="small" column={5}>
        <Descriptions.Item label="Country">{country}</Descriptions.Item>
        <Descriptions.Item label="Visa Type">{visaType}</Descriptions.Item>
        {countryCode === STATE_SKIP_BY_COUNTRY ? stateDropddown : ''}
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
