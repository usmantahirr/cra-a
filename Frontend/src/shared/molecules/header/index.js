import React, { useContext, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import StepCounter from '../../atoms/stepCounter';
import NextStep from '../../atoms/nextStep';
import styles from './style.module.scss';
import Button from '../../atoms/buttons';
import Logo from '../../atoms/logo';
import { SidebarContext } from '../../templates/sidebarContext';
import { getTranslation } from '../../utilities/index';

const { Header: AntHeader } = Layout;

const Header = props => {
  const { t } = useTranslation();
  const sidebarContext = useContext(SidebarContext);
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
        <AntHeader className="mobile-header">
          <Button onClick={() => sidebarContext.setIsCollapsed(!sidebarContext.isCollapsed)}>Mobile Menu</Button>
          <Logo />
        </AntHeader>
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
    return (
      <Row>
        <Col span={6}>
          <span>{getTranslation('Application ID', t)}</span>
          <strong>{_renderApplicationId()}</strong>
        </Col>
        <Col span={6}>
          <span>{getTranslation('Source', t)}</span>
          <strong>{_renderSourceLocation()}</strong>
        </Col>
        <Col span={6}>
          <span>{getTranslation('Destination', t)}:</span>
          <strong>{_renderDestinationLocation()}</strong>
        </Col>
        {applicationFormData.lab && applicationFormData.lab.name && (
          <Col span={6}>
            <span>{getTranslation('Lab Name', t)}</span>
            <strong>{applicationFormData.lab.name}</strong>
          </Col>
        )}
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
      {pageState.curr !== 0 && <div className={styles.appSummery}>{_renderApplicationSummary()}</div>}
    </>
  );
};

export default Header;
