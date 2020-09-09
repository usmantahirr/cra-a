import React from 'react';
import { Layout } from 'antd';
import StepCounter from '../../atoms/stepCounter';
import NextStep from '../../atoms/nextStep';
import styles from './style.module.scss';

const { Header: AntHeader } = Layout;

const Header = props => {
  const { formSchema, pageState, pageHeader } = props;

  if (pageHeader) {
    return (
      <AntHeader className={styles.header}>
        <div className={styles.text}>Manage Application</div>
      </AntHeader>
    );
  }

  return (
    <AntHeader className={styles.header}>
      <StepCounter title="Select Test Type" number={pageState.curr + 1} total={formSchema.length} />
      <NextStep nextStepTitle="Select Visa Issuing Emirate" />
    </AntHeader>
  );
};

export default Header;
