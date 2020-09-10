import React from 'react';
import { Layout, Row, Col } from 'antd';
import StepCounter from '../../atoms/stepCounter';
import NextStep from '../../atoms/nextStep';
import styles from './style.module.scss';

const { Header: AntHeader } = Layout;

const Header = props => {
  const [visaTypeOptions, setVisaTypeOptions] = React.useState();
  const { formSchema, pageState, pageHeader } = props;

  if (pageHeader) {
    return (
      <AntHeader className={`${styles.header} ${styles.headerText}`}>
        <div className={styles.text}>Manage Application</div>
      </AntHeader>
    );
  }

  const getVisaTypeOptions = () => {
    if (visaTypeOptions) {
      return visaTypeOptions;
    }

    let step;
    let section;
    let field;
    let fieldAttributes;
    let fieldAttribute;
    for (let fs = 0; fs < formSchema.length; fs += 1) {
      step = formSchema[fs];
      for (let s = 0; s < step.sections.length; s += 1) {
        section = step.sections[s];
        for (let fa = 0; fa < section.fieldArray.length; fa += 1) {
          field = section.fieldArray[fa];
          fieldAttributes = Object.keys(field);
          for (let a = 0; a < fieldAttributes.length; a += 1) {
            fieldAttribute = fieldAttributes[a];
            if (fieldAttribute === 'name' && field[fieldAttribute] === 'passengerAndVisaType') {
              setVisaTypeOptions(field.visaOptions);
              return field.visaOptions;
            }
          }
        }
      }
    }
    return [];
  };

  const _renderSelectedVisaType = visaTypeValue => {
    if (!visaTypeValue) {
      return null;
    }

    const options = getVisaTypeOptions() || {};
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].value === visaTypeValue) {
        return options[i].text;
      }
    }

    return '';
  };

  const _renderApplicationSummary = () => {
    const { applicationFormData } = props;
    const newApplicationSummary = {};

    Object.keys(applicationFormData).forEach(form => {
      if (Object.prototype.hasOwnProperty.call(applicationFormData, form)) {
        Object.keys(applicationFormData[form]).forEach(formField => {
          if (Object.prototype.hasOwnProperty.call(applicationFormData[form], formField)) {
            if (formField === 'applicantName') {
              newApplicationSummary.applicantName = applicationFormData[form][formField];
            }
            if (formField === 'source') {
              newApplicationSummary.source = applicationFormData[form][formField];
            }
            if (formField === 'destination') {
              newApplicationSummary.destination = applicationFormData[form][formField];
            }
            if (formField === 'visaType') {
              newApplicationSummary.visaType = applicationFormData[form][formField];
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
          <strong>aa</strong>
        </Col>
        <Col span={4}>
          <span>Source:</span>
          <strong>bbb</strong>
        </Col>
        <Col span={4}>
          <span>Destination:</span>
          <strong>cc</strong>
        </Col>
        <Col span={4}>
          <span>Visa Type:</span>
          <strong>{_renderSelectedVisaType(newApplicationSummary.visaType)}</strong>
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
