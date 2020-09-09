import React from 'react';
import { Layout } from 'antd';
import StepCounter from '../../atoms/stepCounter';
import NextStep from '../../atoms/nextStep';

const { Header: AntHeader } = Layout;

const Header = props => {
  const { formSchema, pageState } = props;

  return (
    <AntHeader>
      <StepCounter title="Select Test Type" number={pageState.curr + 1} total={formSchema.length} />
      <NextStep nextStepTitle="Select Visa Issuing Emirate" />
    </AntHeader>
  );
};

export default Header;
