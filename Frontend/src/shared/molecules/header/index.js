import React from 'react';
import { Layout } from 'antd';
import StepCounter from '../../atoms/stepCounter';
import NextStep from '../../atoms/nextStep';

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader>
      <StepCounter title="Select Test Type" number={1} total={8} />
      <NextStep nextStepTitle="Select Visa Issuing Emirate" />
    </AntHeader>
  );
};

export default Header;
