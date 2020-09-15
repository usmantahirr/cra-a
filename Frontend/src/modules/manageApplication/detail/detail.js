import React, { Fragment } from 'react';
import { Card, Col, Row } from 'antd';
import CustomScroll from 'react-custom-scroll';

const ApplicationViewHeader = ({ data }) => {
  return (
    <Fragment>
      <h3>Application Id: {data.id || 'I am here'} </h3>
      <h3> (ICON here) Request Resubmit </h3>
      <h3> (ICON here) Negative </h3>
    </Fragment>
  );
};

const Slab = ({ heading, data, fields, getField }) => {
  return (
    <Fragment>
      <h3 className="sub-heading">{heading}</h3>
      <Card className="card-holder">
        <Row>
          {data &&
            fields &&
            fields.map(({ name, label }) => {
              return (
                data[name] && (
                  <Col key={`${name}`} span={6} className="cardinfo-box">
                    <p className="label">{label}</p>
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
  const { data = {}, viewFields, getField } = props;
  const visaFields = viewFields.visaInformation.sort((a, b) => a - b);
  const appInfoFields = viewFields.applicationInformation.sort((a, b) => a - b);
  const labInfoFields = viewFields.labInformation.sort((a, b) => a - b);

  return (
    <div className="contentNF-scroll">
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

        <h3 className="sub-heading">Document</h3>
        <Card className="card-holder">
          <Row></Row>
        </Card>

        <Slab heading="Lab Information" data={data.labInfo || {}} fields={labInfoFields} getField={getField}></Slab>

        <h3 className="sub-heading">Payment</h3>
        <Card className="card-holder card-holder-single">
          <Row>
            <Col span={12}>
              <p className="label">Screening Test (Inclusive of Tax)</p>
            </Col>
            <Col span={12}>
              <p className="info">{data.lab && `${data.lab.feesAmount} ${data.lab.currency}`} </p>
            </Col>
          </Row>
        </Card>
      </CustomScroll>
    </div>
  );
};

export default ManageApplicationDetailView;
