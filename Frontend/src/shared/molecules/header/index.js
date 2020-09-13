import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import StepCounter from '../../atoms/stepCounter';
import NextStep from '../../atoms/nextStep';
import styles from './style.module.scss';

const { Header: AntHeader } = Layout;

const Header = props => {
  // const [applicationSummaryData, setApplicationSummaryData] = React.useState({});
  const { formSchema, pageState, pageHeader, applicationFormData, applicationId } = props;

  useEffect(() => {
    // const newApplicationSummary = {};
    // Object.keys(applicationFormData).forEach(form => {
    //   if (Object.prototype.hasOwnProperty.call(applicationFormData, form)) {
    //     Object.keys(applicationFormData[form]).forEach(formField => {
    //       if (Object.prototype.hasOwnProperty.call(applicationFormData[form], formField)) {
    //         newApplicationSummary[formField] = applicationFormData[form][formField];
    //       }
    //     });
    //   }
    // });
    // setApplicationSummaryData(newApplicationSummary);
  }, [props]);

  if (pageHeader) {
    return (
      <AntHeader className={`${styles.header} ${styles.headerText}`}>
        <div className={styles.text}>Manage Application</div>
      </AntHeader>
    );
  }

  const _renderApplicationId = () => {
    return applicationId;
  };

  const _renderSourceLocation = () => {
    const sourceArray = [];
    if (applicationFormData) {
      if (applicationFormData.sourceCountry && applicationFormData.sourceCountry.label)
        sourceArray.push(applicationFormData.sourceCountry.label);
      if (applicationFormData.sourceState && applicationFormData.sourceState.label)
        sourceArray.push(applicationFormData.sourceState.label);
      if (applicationFormData.sourceCity && applicationFormData.sourceCity.label)
        sourceArray.push(applicationFormData.sourceCity.label);
    }
    return sourceArray.join(', ');
  };

  const _renderDestinationLocation = () => {
    const destinationArray = [];
    if (applicationFormData) {
      if (applicationFormData.destCountry && applicationFormData.destCountry.label)
        destinationArray.push(applicationFormData.destCountry.label);
      if (applicationFormData.destState && applicationFormData.destState.label)
        destinationArray.push(applicationFormData.destState.label);
      if (applicationFormData.destCity && applicationFormData.destCity.label)
        destinationArray.push(applicationFormData.destCity.label);
    }
    return destinationArray.join(', ');
  };

  const _renderApplicationSummary = () => {
    // const scopeArray = [
    //   'name',
    //   'passportId',
    //   'labCountryName',
    //   'labStateName',
    //   'labCityName',
    //   'labServiceType',
    //   'labName',
    // ];

    return (
      <Row>
        <Col span={4}>
          <span>Application ID:</span>
          <strong>{_renderApplicationId()}</strong>
        </Col>
        <Col span={4}>
          <span>Source:</span>
          <strong>{_renderSourceLocation()}</strong>
        </Col>
        <Col span={4}>
          <span>Destination:</span>
          <strong>{_renderDestinationLocation()}</strong>
        </Col>
        <Col span={4}>
          <span>Visa Type:</span>
          <strong>
            {applicationFormData.passengerType +
              (applicationFormData.visaType ? `, ${applicationFormData.visaType}` : '')}
          </strong>
        </Col>
        <Col span={4}>
          <span>Applicant Name:</span>
          <strong>{applicationFormData.name}</strong>
        </Col>
        {/* {scopeArray.map(control => {
          if (applicationFormData[control])
            return (
              <Col span={6}>
                <span>{control}</span>
<<<<<<< HEAD
                <strong>
                  {moment.isMoment(applicationSummaryData[control])
                    ? applicationSummaryData[control].toString()
                    : applicationSummaryData[control]}
                </strong>
=======
                <strong>{applicationFormData[control]}</strong>
>>>>>>> 459e6b97457a616eadfd05cc476868a9da088050
              </Col>
            );
          return null;
        })} */}
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
