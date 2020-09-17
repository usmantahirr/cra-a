import React, { Fragment } from 'react';
import { Card, Col, Row } from 'antd';
import * as moment from 'moment';
import { DATE_FORMATE } from '../../../config';

const ReviewApplication = ({ fieldsToDisplay, applicationFormData }) => {
  const data =
    Object.keys(applicationFormData).length === 0 && applicationFormData.constructor === Object
      ? {}
      : applicationFormData;
  const fields = fieldsToDisplay.sort((a, b) => a - b);

  const formatData = formData => {
    if (moment.isMoment(formData)) {
      return formData.format(DATE_FORMATE);
    }
    return formData;
  };
  return (
    <Fragment>
      <h3 className="sub-heading">Personal Information</h3>
      <Card className="card-holder">
        <Row>
          {fields &&
            fields.map(({ name, label }) => {
              return (
                data[name] && (
                  <Col key={`${name}`} span={6} className="cardinfo-box">
                    <p className="label">{label}</p>
                    <p className="info">
                      {formatData(data[name].value || data[name].name || data[name].label || data[name])}
                    </p>
                  </Col>
                )
              );
            })}
        </Row>
      </Card>
      <h3 className="sub-heading">Payment Information</h3>
      <Card className="card-holder card-holder-single">
        <Row>
          <Col span={12}>
            <p className="label">Screening Test (Inclusive of Tax)</p>
          </Col>
          <Col span={12}>
            <p className="info">
              {applicationFormData.lab && `${applicationFormData.lab.feesAmount} ${applicationFormData.lab.currency}`}{' '}
            </p>
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

export default ReviewApplication;
