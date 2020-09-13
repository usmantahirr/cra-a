import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import StepCounter from '../../atoms/stepCounter';
import NextStep from '../../atoms/nextStep';
import styles from './style.module.scss';

const { Header: AntHeader } = Layout;

const Header = props => {
  const [applicationSummaryData, setApplicationSummaryData] = React.useState({});
  const { formSchema, pageState, pageHeader } = props;

  useEffect(() => {
    const { applicationFormData } = props;
    if (!applicationFormData) {
      return;
    }
    const newApplicationSummary = {};
    Object.keys(applicationFormData).forEach(form => {
      if (Object.prototype.hasOwnProperty.call(applicationFormData, form)) {
        Object.keys(applicationFormData[form]).forEach(formField => {
          if (Object.prototype.hasOwnProperty.call(applicationFormData[form], formField)) {
            newApplicationSummary[formField] = applicationFormData[form][formField];
          }
        });
      }
    });
    setApplicationSummaryData(newApplicationSummary);
  }, [props]);

  if (pageHeader) {
    return (
      <AntHeader className={`${styles.header} ${styles.headerText}`}>
        <div className={styles.text}>Manage Application</div>
      </AntHeader>
    );
  }

  const _renderApplicationId = () => {
    return applicationSummaryData.applicationId || 'DUMMY_ID';
  };

  const _renderSourceLocation = () => {
    const sourceArray = [];
    if (applicationSummaryData) {
      if (applicationSummaryData.sourceCountry && applicationSummaryData.sourceCountry.label)
        sourceArray.push(applicationSummaryData.sourceCountry.label);
      if (applicationSummaryData.sourceState && applicationSummaryData.sourceState.label)
        sourceArray.push(applicationSummaryData.sourceState.label);
      if (applicationSummaryData.sourceCity && applicationSummaryData.sourceCity.label)
        sourceArray.push(applicationSummaryData.sourceCity.label);
    }
    return sourceArray.join(', ');
  };

  const _renderDestinationLocation = () => {
    const destinationArray = [];
    if (applicationSummaryData) {
      if (applicationSummaryData.destCountry && applicationSummaryData.destCountry.label)
        destinationArray.push(applicationSummaryData.destCountry.label);
      if (applicationSummaryData.destState && applicationSummaryData.destState.label)
        destinationArray.push(applicationSummaryData.destState.label);
      if (applicationSummaryData.destCity && applicationSummaryData.destCity.label)
        destinationArray.push(applicationSummaryData.destCity.label);
    }
    return destinationArray.join(', ');
  };

  const _renderApplicationSummary = () => {
    const scopeArray = [
      'name',
      'passportId',
      'labCountryName',
      'labStateName',
      'labCityName',
      'labServiceType',
      'labName',
    ];

    return (
      <Row>
        <Col span={6}>
          <span>Application ID:</span>
          <strong>{_renderApplicationId()}</strong>
        </Col>
        <Col span={6}>
          <span>Source:</span>
          <strong>{_renderSourceLocation()}</strong>
        </Col>
        <Col span={6}>
          <span>Destination:</span>
          <strong>{_renderDestinationLocation()}</strong>
        </Col>
        <Col span={6}>
          <span>Visa Type:</span>
          <strong>
            {applicationSummaryData.passengerType +
              (applicationSummaryData.visaType ? `, ${applicationSummaryData.visaType}` : '')}
          </strong>
        </Col>
        {scopeArray.map(control => {
          if (applicationSummaryData[control])
            return (
              <Col span={6}>
                <span>{control}</span>
                <strong>{applicationSummaryData[control]}</strong>
              </Col>
            );
          return null;
        })}
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
      {pageState.curr !== 0 && <div className={styles.appSummery}>{_renderApplicationSummary()}</div>}
    </>
  );
};

export default Header;
