import React, { Fragment } from 'react';
import { Card, Col, Row } from 'antd';
import * as moment from 'moment';

const ReviewApplication = ({ fieldsToDisplay, applicationFormData }) => {
  const merge = objs => {
    const target = {};
    const merger = obj => {
      Object.keys(obj).forEach(prop => {
        target[prop] = obj[prop];
      });
    };
    Object.keys(objs).forEach(key => {
      merger(objs[key]);
    });
    return target;
  };

  const data =
    Object.keys(applicationFormData).length === 0 && applicationFormData.constructor === Object
      ? {}
      : merge(applicationFormData);
  const fields = fieldsToDisplay.sort((a, b) => a - b);

  const formatData = formData => {
    if (moment.isMoment(formData)) {
      return formData.format('DD/MM/YYYY');
    }
    return formData;
  };
  return (
    <Fragment>
      <h1>Personal Information</h1>
      <Card>
        <Row>
          {fields &&
            fields.map(({ name, label }) => {
              return (
                data[name] && (
                  <Col span={6}>
                    <p>{label}</p>
                    <p>{formatData(data[name])}</p>
                  </Col>
                )
              );
            })}
        </Row>
      </Card>
      <h1>Payment Information</h1>
      <Card>
        <p>Screening Test (Inclusive of Tax)</p>
      </Card>
    </Fragment>
  );
};

export default ReviewApplication;
