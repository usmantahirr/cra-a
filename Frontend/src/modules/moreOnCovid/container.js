import React from 'react';
import DashboardTemplate from '../../shared/templates/dashboardTemplate';
import { RadioButton, RadioGroup } from '../../shared/atoms/radio/index';

const MoreOnCovid = () => {
  return (
    <DashboardTemplate>
      <div>
        <RadioButton className="ant-radio-lg">Test</RadioButton>

        <RadioGroup className="ant-radio-lg"></RadioGroup>
      </div>
    </DashboardTemplate>
  );
};

export default MoreOnCovid;
