import React from 'react';
import CustomScroll from 'react-custom-scroll';
import DashboardTemplate from '../../shared/templates/dashboardTemplate';
import { RadioButton, RadioGroup, RadioGroupRound } from '../../shared/atoms/radio/index';
import LabSelection from '../../shared/organisms/labSelection/index';

const MoreOnCovid = () => {
  return (
    <DashboardTemplate>
      <CustomScroll heightRelativeToParent="100%">
        <div>
          <RadioButton className="ant-radio-lg">Test</RadioButton>

          <RadioGroup className="ant-radio-lg"></RadioGroup>

          <RadioGroupRound></RadioGroupRound>

          <LabSelection />
        </div>
      </CustomScroll>
    </DashboardTemplate>
  );
};

export default MoreOnCovid;
