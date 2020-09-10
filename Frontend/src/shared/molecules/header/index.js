import React from 'react';
import { Layout, Row, Col } from 'antd';
import StepCounter from '../../atoms/stepCounter';
import NextStep from '../../atoms/nextStep';
import styles from './style.module.scss';

const { Header: AntHeader } = Layout;

const Header = props => {
  const { formSchema, pageState, pageHeader } = props;
  let applicantName;
  let source;
  let destination;
  let visaType;

  if (pageHeader) {
    return (
      <AntHeader className={styles.header}>
        <div className={styles.text}>Manage Application</div>
      </AntHeader>
    );
  }

  const _renderApplicationSummary = () => {
    const { applicationFormData } = props;

    Object.keys(applicationFormData).forEach(form => {
      if (Object.prototype.hasOwnProperty.call(applicationFormData, form)) {
        Object.keys(applicationFormData[form]).forEach(formField => {
          if (Object.prototype.hasOwnProperty.call(applicationFormData[form], formField)) {
            if (formField === 'applicantName') {
              applicantName = applicationFormData[form][formField];
            }
            if (formField === 'source') {
              source = applicationFormData[form][formField];
            }
            if (formField === 'destination') {
              destination = applicationFormData[form][formField];
            }
            if (formField === 'visaType') {
              visaType = applicationFormData[form][formField];
            }
          }
        });
      }
    });

    return (
      <Row>
        <Col>
          <Row>Application ID:</Row>
          <Row>12312312312</Row>
        </Col>
        <Col>
          <Row>Applicant Name:</Row>
          <Row>{applicantName}</Row>
        </Col>
        <Col>
          <Row>Source:</Row>
          <Row>{source}</Row>
        </Col>
        <Col>
          <Row>Destination:</Row>
          <Row>{destination}</Row>
        </Col>
        <Col>
          <Row>Visa Type:</Row>
          <Row>{visaType}</Row>
        </Col>
      </Row>
    );
  };

  return (
    <AntHeader className={styles.header}>
      <div className={styles.headerbg}>
        <StepCounter
          title="Select Test Type"
          number={pageState.curr + 1}
          total={formSchema.length}
          className={styles.stepcounter}
        />
        <NextStep nextStepTitle="Select Visa Issuing Emirate" className={styles.nextstep} />
      </div>
      {_renderApplicationSummary()}
    </AntHeader>
  );
};

export default Header;
