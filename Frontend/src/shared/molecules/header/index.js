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
      <AntHeader className={`${styles.header} ${styles.headerText}`}>
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
        <Col span={4}>
          <span>Application ID:</span>
          <strong>12312312312</strong>
        </Col>
        <Col span={4}>
          <span>Applicant Name:</span>
          <strong>{applicantName}</strong>
        </Col>
        <Col span={4}>
          <span>Source:</span>
          <strong>{source}</strong>
        </Col>
        <Col span={4}>
          <span>Destination:</span>
          <strong>{destination}</strong>
        </Col>
        <Col span={4}>
          <span>Visa Type:</span>
          <strong>{visaType}</strong>
        </Col>
      </Row>
    );
  };

  const nextStepTitle = () => {
    if (pageState.curr + 1 >= formSchema.length) {
      return false;
    }
    return formSchema[pageState.curr] ? formSchema[pageState.curr + 1].stepTitle : '';
  };

  return (
    <>
      <AntHeader className={styles.header}>
        <div className={styles.headerbg}>
          <StepCounter
            title={formSchema[pageState.curr] ? formSchema[pageState.curr].stepTitle : ''}
            number={pageState.curr + 1}
            total={formSchema.length}
            className={styles.stepcounter}
          />
          {nextStepTitle() !== false && <NextStep nextStepTitle={nextStepTitle()} className={styles.nextstep} />}
        </div>
      </AntHeader>
      <div className={styles.appSummery}>{_renderApplicationSummary()}</div>
    </>
  );
};

export default Header;
