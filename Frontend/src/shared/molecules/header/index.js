import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import StepCounter from '../../atoms/stepCounter';
import NextStep from '../../atoms/nextStep';
import styles from './style.module.scss';
import { loadVisaTypeOptions } from '../../../utilities';
import service from '../../services/shared.service';

const { Header: AntHeader } = Layout;

const Header = props => {
  const [applicationSummaryData, setApplicationSummaryData] = React.useState({});

  const [visaTypeOptions, setVisaTypeOptions] = React.useState();
  const [countryOptions, setCountryOptions] = React.useState([]);
  const [srcStateOptions, setSrcStateOptions] = React.useState([]);
  const [destStateOptions, setDestStateOptions] = React.useState([]);
  const [srcCityOptions, setSrcCityOptions] = React.useState([]);
  const [destCityOptions, setDestCityOptions] = React.useState([]);

  const { formSchema, pageState, pageHeader } = props;

  const fetchCoutries = async () => {
    try {
      const { data } = await service.getCountries();
      if (data && data.length > 0) setCountryOptions(data);
      else setCountryOptions([]);
    } catch (error) {
      return setCountryOptions([]);
    }
    return null;
  };

  const fetchStates = async (countryId, isSource) => {
    if (!countryId) {
      return;
    }
    try {
      const { data } = await service.getStates(countryId);
      if (data && data.length > 0) {
        if (isSource) {
          setSrcStateOptions(data);
        } else {
          setDestStateOptions(data);
        }
      } else if (isSource) {
        setSrcStateOptions([]);
      } else {
        setDestStateOptions([]);
      }
    } catch (error) {
      if (isSource) {
        setSrcStateOptions([]);
      } else {
        setDestStateOptions([]);
      }
    }
  };

  const fetchCities = async (countryOrStateId, isSource) => {
    if (!countryOrStateId) {
      return;
    }
    try {
      const { data } = await service.getCities(countryOrStateId);
      if (data && data.length > 0) {
        if (isSource) {
          setSrcCityOptions(data);
        } else {
          setDestCityOptions(data);
        }
      } else if (isSource) {
        setSrcCityOptions([]);
      } else {
        setDestCityOptions([]);
      }
    } catch (error) {
      if (isSource) {
        setSrcCityOptions([]);
      } else {
        setDestCityOptions([]);
      }
    }
  };

  useEffect(() => {
    const { applicationFormData } = props;
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

    fetchCoutries();
    fetchStates(newApplicationSummary.sourceCountry, true);
    fetchStates(newApplicationSummary.destCountry, false);
    fetchCities(newApplicationSummary.sourceState || newApplicationSummary.sourceCountry, true);
    fetchCities(newApplicationSummary.destState || newApplicationSummary.destCountry, false);
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

  const _renderSourceLocation = (srcCountry, srcState, srcCity) => {
    if (!srcCountry) {
      return null;
    }

    const selectedCountry = countryOptions.find(c => c._id === srcCountry) || {};
    const countryLabel = selectedCountry.name || '';

    let stateLabel = ', ';
    if (selectedCountry.iso_code === 'USA') {
      const selectedState = srcStateOptions.find(c => c._id === srcState) || {};
      stateLabel += `${selectedState.name}, ` || '';
    }

    const selectedCity = srcCityOptions.find(c => c._id === srcCity) || {};
    const cityLabel = selectedCity.name || '';

    return countryLabel + stateLabel + cityLabel;
  };

  const _renderDestinationLocation = (destCountry, destState, destCity) => {
    if (!destCountry) {
      return null;
    }

    const selectedCountry = countryOptions.find(c => c._id === destCountry) || {};
    const countryLabel = selectedCountry.name || '';

    let stateLabel = ', ';
    if (selectedCountry.iso_code === 'USA') {
      const selectedState = destStateOptions.find(c => c._id === destState) || {};
      stateLabel += `${selectedState.name}, ` || '';
    }

    const selectedCity = destCityOptions.find(c => c._id === destCity) || {};
    const cityLabel = selectedCity.name || '';

    return countryLabel + stateLabel + cityLabel;
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
        <Col span={4}>
          <span>Source:</span>
          <strong>
            {_renderSourceLocation(
              applicationSummaryData.sourceCountry,
              applicationSummaryData.sourceState,
              applicationSummaryData.sourceCity
            )}
          </strong>
        </Col>
        <Col span={4}>
          <span>Destination:</span>
          <strong>
            {_renderDestinationLocation(
              applicationSummaryData.destCountry,
              applicationSummaryData.destState,
              applicationSummaryData.destCity
            )}
          </strong>
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
      <div className={styles.appSummery}>{_renderApplicationSummary()}</div>
    </>
  );
};

export default Header;
