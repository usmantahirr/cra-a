import React, { useContext, useEffect, useState } from 'react';
import { Layout, Row, Col, Tooltip } from 'antd';
import StepCounter from '../../atoms/stepCounter';
import NextStep from '../../atoms/nextStep';
import styles from './style.module.scss';
import Button from '../../atoms/buttons';
import Logo from '../../atoms/logo';
import { SidebarContext } from '../../templates/sidebarContext';

const { Header: AntHeader } = Layout;

const Header = props => {
  const sidebarContext = useContext(SidebarContext);
  const [toggle, setToggle] = useState(false);
  // const [applicationSummaryData, setApplicationSummaryData] = React.useState({});
  const {
    formSchema,
    pageState,
    pageHeader,
    applicationFormData,
    applicationId,
    heading = 'Manage Application',
  } = props;

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
      <>
        <AntHeader className={`${styles.header} ${styles.headerText} desktop-header`}>
          <div className={styles.text}>{heading}</div>
        </AntHeader>
        <div className="mobile-header-holder">
          <AntHeader className="mobile-header">
            <Button className="ant-btn-mb" onClick={() => sidebarContext.setIsCollapsed(!sidebarContext.isCollapsed)}>
              Mobile Menu
            </Button>
            <Logo />
          </AntHeader>
        </div>
      </>
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
        <Col xs={12} md={6}>
          <span>Application ID:</span>
          <Tooltip placement="bottomLeft" title={_renderApplicationId()}>
            <strong>{_renderApplicationId()}</strong>
          </Tooltip>
        </Col>
        <Col xs={12} md={6}>
          <span>Source:</span>
          <Tooltip placement="bottomLeft" title={_renderSourceLocation()}>
            <strong>{_renderSourceLocation()}</strong>
          </Tooltip>
        </Col>
        <Col xs={12} md={6}>
          <span>Destination:</span>
          <Tooltip placement="bottomLeft" title={_renderDestinationLocation()}>
            <strong>{_renderDestinationLocation()}</strong>
          </Tooltip>
        </Col>
        {applicationFormData.lab && applicationFormData.lab.name && (
          <Col xs={12} md={6}>
            <span>Lab Name:</span>
            <Tooltip placement="bottomLeft" title={applicationFormData.lab.name}>
              <strong>{applicationFormData.lab.name}</strong>
            </Tooltip>
          </Col>
        )}
        {/* <Col span={4}>
          <span>Visa Type:</span>
          <strong>
            {applicationFormData.passengerType +
              (applicationFormData.visaType ? `, ${applicationFormData.visaType}` : '')}
          </strong>
        </Col>
        <Col span={4}>
          <span>Applicant Name:</span>
          <strong>{applicationFormData.name}</strong>
        </Col> */}
        {/* {scopeArray.map(control => {
          if (applicationFormData[control])
            return (
              <Col span={6}>
                <span>{control}</span>
                <strong>{applicationFormData[control]}</strong>
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
      <div className="mobile-header-holder">
        <AntHeader className="mobile-header">
          <Button className="ant-btn-mb" onClick={() => sidebarContext.setIsCollapsed(!sidebarContext.isCollapsed)}>
            Mobile Menu
          </Button>
          <Logo />
        </AntHeader>
        <div className="mobile-counter">
          <StepCounter
            title={formSchema[pageState.curr] ? formSchema[pageState.curr].stepTitle : ''}
            number={pageState.curr + 1}
            total={formSchema.length}
            className="stepcounter"
          />
          {nextStepTitle() !== false && <NextStep nextStepTitle={nextStepTitle()} className="nextstep" />}
        </div>
      </div>
      <AntHeader className={`${styles.header} desktop-header`}>
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
      {pageState.curr !== 0 && (
        <div className={`${styles.appSummery} ${toggle && 'open'} appSummery`}>
          <div className="appSummery-holder">
            {_renderApplicationSummary()}
            <Button onClick={() => setToggle(!toggle)} className="openBtn">
              Click
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
