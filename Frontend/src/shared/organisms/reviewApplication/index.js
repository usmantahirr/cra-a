import React, { Fragment } from 'react';
import { Card, Col, Row } from 'antd';
import * as moment from 'moment';
import { mergeObjects } from '../../utilities';

const ReviewApplication = ({ fieldsToDisplay, applicationFormData }) => {
  const data =
    Object.keys(applicationFormData).length === 0 && applicationFormData.constructor === Object
      ? {}
      : mergeObjects(applicationFormData);
  const fields = fieldsToDisplay.sort((a, b) => a - b);

  const formatData = formData => {
    if (moment.isMoment(formData)) {
      return formData.format('DD/MM/YYYY');
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
                  <Col span={6} className="cardinfo-box">
                    <p className="label">{label}</p>
                    <p className="info">{formatData(data[name].value || formatData(data[name]))}</p>
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
            <p className="info">410 AED (111.63 USD Approx) </p>
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

export default ReviewApplication;
