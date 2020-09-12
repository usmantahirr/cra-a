import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import StepCounter from '../../atoms/stepCounter';
import NextStep from '../../atoms/nextStep';
import styles from './style.module.scss';
import { loadVisaTypeOptions } from '../../utilities';

const { Header: AntHeader } = Layout;

const Header = props => {
  const [applicationSummaryData, setApplicationSummaryData] = React.useState({});
  const [visaTypeOptions, setVisaTypeOptions] = React.useState();
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
            if (formField === 'applicantName') {
              newApplicationSummary.applicantName = applicationFormData[form][formField];
            }
            if (formField === 'sourceCountry') {
              newApplicationSummary.sourceCountry = applicationFormData[form][formField];
            }
            if (formField === 'sourceState') {
              newApplicationSummary.sourceState = applicationFormData[form][formField];
            }
            if (formField === 'sourceCity') {
              newApplicationSummary.sourceCity = applicationFormData[form][formField];
            }
            if (formField === 'destCountry') {
              newApplicationSummary.destCountry = applicationFormData[form][formField];
            }
            if (formField === 'destState') {
              newApplicationSummary.destState = applicationFormData[form][formField];
            }
            if (formField === 'destCity') {
              newApplicationSummary.destCity = applicationFormData[form][formField];
            }
            if (formField === 'visaType') {
              newApplicationSummary.visaType = applicationFormData[form][formField];
            }
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

  const _renderApplicantName = () => {
    return applicationSummaryData.applicantName || '';
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

  const getVisaTypeOptions = () => {
    if (visaTypeOptions) {
      return visaTypeOptions;
    }

    const options = loadVisaTypeOptions(formSchema);
    setVisaTypeOptions(options);
    return options;
  };

  const _renderSelectedVisaType = visaTypeValue => {
    if (!visaTypeValue) {
      return null;
    }

    const options = getVisaTypeOptions() || [];
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].value === visaTypeValue) {
        return options[i].text;
      }
    }

    return '';
  };

  const _renderApplicationSummary = () => {
    return (
      <Row>
        <Col span={4}>
          <span>Application ID:</span>
          <strong>{_renderApplicationId()}</strong>
        </Col>
        <Col span={4}>
          <span>Applicant Name:</span>
          <strong>{_renderApplicantName()}</strong>
        </Col>
        <Col span={6}>
          <span>Source:</span>
          <strong>{_renderSourceLocation()}</strong>
        </Col>
        <Col span={6}>
          <span>Destination:</span>
          <strong>{_renderDestinationLocation()}</strong>
        </Col>
        <Col span={4}>
          <span>Visa Type:</span>
          <strong>{_renderSelectedVisaType(applicationSummaryData.visaType)}</strong>
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
      {pageState.curr !== 0 && <div className={styles.appSummery}>{_renderApplicationSummary()}</div>}
    </>
  );
};

export default Header;
