import React, { Fragment } from 'react';
import { Card, Col, Row } from 'antd';
import CustomScroll from 'react-custom-scroll';
import { useTranslation } from 'react-i18next';
import FileViewer from './fileViewer';

const ApplicationViewHeader = ({ data }) => {
  const [t] = useTranslation();
  return (
    <Fragment>
      <h3>
        {t('Application Id')}: {data.id || 'I am here'}{' '}
      </h3>
      <h3> (ICON here) {t('Request Resubmit')} </h3>
      <h3> (ICON here) {t('Negative')} </h3>
    </Fragment>
  );
};

const Slab = ({ heading, data, fields, getField }) => {
  const [t] = useTranslation();
  return (
    <Fragment>
      <h3 className="sub-heading">{t(heading)}</h3>
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

  return (
    // <div className="contentNF-scroll">
    <CustomScroll heightRelativeToParent="100%">
      <ApplicationViewHeader data={data} />
      {<Slab heading="Visa Information" data={data.visaInfo || {}} fields={visaFields} getField={getField}></Slab>}
      {
        <Slab
          heading="Application Information"
          data={data.appInfo || {}}
          fields={appInfoFields}
          getField={getField}
        ></Slab>
      }

      <h3 className="sub-heading">{t('Document')}</h3>
      <Card className="card-holder">
        <FileViewer name="length.png"> </FileViewer>
      </Card>

      <Slab heading="Lab Information" data={data.labInfo || {}} fields={labInfoFields} getField={getField}></Slab>

      <h3 className="sub-heading">{t('Payment')}</h3>
      <Card className="card-holder card-holder-single">
        <Row>
          <Col span={6}>
            <p className="label">{t('Screening Test (Inclusive of Tax')}</p>
          </Col>
          <Col span={6}>
            <p className="info">{data && `${data.labFees} ${data.labCurrency}`} </p>
          </Col>
        </Row>
      </Card>
    </CustomScroll>
    // </div>
  );
};

export default ManageApplicationDetailView;
