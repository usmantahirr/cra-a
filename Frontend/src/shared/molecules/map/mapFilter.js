import React from 'react';
import { PageHeader, Descriptions } from 'antd';
import { CustomSelect } from '../../atoms/forms';

const MapFilter = ({ country, visaType, stateOptions, cityOptions, serviceOptions }) => {
  return (
    <PageHeader ghost={false} title="Title">
      <Descriptions size="small" column={5}>
        <Descriptions.Item label="Country">{country}</Descriptions.Item>
        <Descriptions.Item label="Visa Type">{visaType}</Descriptions.Item>
        <Descriptions.Item label="State">
          <CustomSelect options={stateOptions} />
        </Descriptions.Item>
        <Descriptions.Item label="City">
          <CustomSelect options={cityOptions} />
        </Descriptions.Item>
        <Descriptions.Item label="Lab Type" options={serviceOptions}>
          <CustomSelect />
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
};

export default MapFilter;
