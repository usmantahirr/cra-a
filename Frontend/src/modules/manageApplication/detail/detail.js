import React, { Fragment } from 'react';
import { Card, Col, Row } from 'antd';
import CustomScroll from 'react-custom-scroll';
import { useTranslation } from 'react-i18next';
import FileViewer from './fileViewer';

const ApplicationViewHeader = ({ data }) => {
  const [t] = useTranslation();
  return (
    <Fragment>
      <Row className="ant-row-padding manageapp-head">
        <Col xs={24} lg={12}>
          <h3 className="sub-heading">
            {t('Application Id')}: {data.id || 'I am here'}{' '}
          </h3>
        </Col>
        <Col xs={24} lg={12} className="align-right">
          <div className="record-holder submit">
            {' '}
            <img src="/assets/img/icon-submit.svg" alt="" /> <span>{t('Request Resubmit')} </span>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

const Slab = ({ heading, data, fields, getField, showTestResult = false }) => {
  const [t] = useTranslation();
  return (
    <Fragment>
      <h3 className="sub-sm-heading">
        {t(heading)}
        {showTestResult ? <div className="status negative"> {t('Negative')} </div> : ''}
      </h3>
      <Card className="card-holder">
        <Row className="ant-row-padding">
          {data &&
            fields &&
            fields.map(({ name, label }) => {
              return (
                data[name] && (
                  <Col key={`${name}`} xs={12} lg={6} className="cardinfo-box">
                    <p className="label">{t(label)}</p>
                    <p className="info">{getField(data[name])}</p>
                  </Col>
                )
              );
            })}
        </Row>
      </Card>
    </Fragment>
  );
};

const ManageApplicationDetailView = props => {
  const [t] = useTranslation();
  const { data = {}, viewFields, getField } = props;
  const visaFields = viewFields.visaInformation.sort((a, b) => a - b);
  const appInfoFields = viewFields.applicationInformation.sort((a, b) => a - b);
  const labInfoFields = viewFields.labInformation.sort((a, b) => a - b);
  const showTestResult = true;

  return (
    <div className="content-scrollbar">
      <CustomScroll heightRelativeToParent="100%">
        <ApplicationViewHeader data={data} />
        {
          <Slab
            heading="Visa Information"
            data={data.visaInfo || {}}
            fields={visaFields}
            getField={getField}
            showTestResult={showTestResult}
          ></Slab>
        }
        {
          <Slab
            heading="Application Information"
            data={data.appInfo || {}}
            fields={appInfoFields}
            getField={getField}
          ></Slab>
        }

        <h3 className="sub-sm-heading">{t('Document')}</h3>
        <Card className="card-holder card-btm-holder">
          <FileViewer name="length.png"> </FileViewer>
        </Card>

        <Slab heading="Lab Information" data={data.labInfo || {}} fields={labInfoFields} getField={getField}></Slab>

        <h3 className="sub-sm-heading">{t('Payment')}</h3>
        <Card className="card-holder card-holder-single">
          <Row>
            <Col span={12}>
              <p className="label">{t('Screening Test (Inclusive of Tax')}</p>
            </Col>
            <Col span={12}>
              <p className="info info-large">{data && `${data.labFees} ${data.labCurrency}`} </p>
            </Col>
          </Row>
        </Card>
      </CustomScroll>
    </div>
  );
};

export default ManageApplicationDetailView;
