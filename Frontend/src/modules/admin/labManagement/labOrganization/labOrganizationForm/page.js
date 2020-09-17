import React, { useEffect } from 'react';
import { Form, Col, Row } from 'antd';
import CustomScroll from 'react-custom-scroll';
import Button from '../../../../../shared/atoms/buttons';
import InputCustom from '../../../../../shared/atoms/forms/input';
import DashboardPageTemplate from '../../../../../shared/templates/dashboardTemplate';
import CustomTelInput from '../../../../../shared/atoms/inputs/customTelInput';

const LabOrganization = ({ validationRules, handleSubmit, showLoader, formData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...formData });
  }, [formData]);

  return (
    <DashboardPageTemplate>
      <div className="content-scrollbar">
        <CustomScroll heightRelativeToParent="100%">
          <Form form={form} layout="vertical" name="labOrganization" onFinish={handleSubmit}>
            <Row className="ant-row-padding">
              <Col span={24}>
                <InputCustom
                  label="Lab Name"
                  placeholder="Lab Name"
                  type="text"
                  value="labName"
                  validators={validationRules.labName}
                  className="custom-control"
                />
              </Col>
            </Row>
            <h1 className="inner-heading">Bussiness Point Of Contact</h1>
            <Row className="ant-row-padding">
              <Col span={12}>
                <InputCustom
                  label="Contact Name"
                  placeholder="Contact Name"
                  type="text"
                  value="bussinessContactName"
                  validators={validationRules.bussinessContactName}
                  className="custom-control"
                />
              </Col>
              <Col span={12}>
                <InputCustom
                  label="Designation"
                  placeholder="Designation"
                  type="text"
                  value="bussinessDesignation"
                  validators={validationRules.bussinessDesignation}
                  className="custom-control"
                />
              </Col>
            </Row>
            <Row className="ant-row-padding">
              <Col span={12}>
                <Form.Item {...validationRules.bussinessPhone} className="custom-item">
                  <CustomTelInput
                    id="bussinessPhone"
                    placeholder="Phone"
                    label="Phone"
                    value={form.getFieldValue('bussinessPhone')}
                    className="custom-control"
                    required
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <InputCustom
                  label="Email Address"
                  placeholder="Email Address"
                  type="email"
                  value="email"
                  validators={validationRules.bussinessEmail}
                  className="custom-control"
                />
              </Col>
            </Row>
            <h1 className="inner-heading">Technical Point Of Contact</h1>
            <Row className="ant-row-padding">
              <Col span={12}>
                <InputCustom
                  label="Contact Name"
                  placeholder="Contact Name"
                  type="text"
                  value="technicalContactName"
                  validators={validationRules.technicalContactName}
                  className="custom-control"
                />
              </Col>
              <Col span={12}>
                <InputCustom
                  label="Designation"
                  placeholder="Designation"
                  type="text"
                  value="technicalDesignation"
                  validators={validationRules.technicalDesignation}
                  className="custom-control"
                />
              </Col>
            </Row>
            <Row className="ant-row-padding">
              <Col span={12}>
                <Form.Item {...validationRules.technicalPhone} className="custom-item">
                  <CustomTelInput
                    id="technicalPhone"
                    placeholder="Phone"
                    label="Phone"
                    value={form.getFieldValue('technicalPhone')}
                    className="custom-control"
                    required
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <InputCustom
                  label="Email Address"
                  placeholder="Email Address"
                  type="email"
                  value="technicalEmail"
                  validators={validationRules.technicalEmail}
                  className="custom-control"
                />
              </Col>
            </Row>
            <h1 className="inner-heading">Finance Point Of Contact</h1>
            <Row className="ant-row-padding">
              <Col span={12}>
                <InputCustom
                  label="Contact Name"
                  placeholder="Contact Name"
                  type="text"
                  value="financeContactName"
                  validators={validationRules.financeContactName}
                  className="custom-control"
                />
              </Col>
              <Col span={12}>
                <InputCustom
                  label="Designation"
                  placeholder="Designation"
                  type="text"
                  value="financeDesignation"
                  validators={validationRules.financeDesignation}
                  className="custom-control"
                />
              </Col>
            </Row>
            <Row className="ant-row-padding">
              <Col span={12}>
                <Form.Item {...validationRules.financePhone} className="custom-item">
                  <CustomTelInput
                    id="financePhone"
                    placeholder="Phone"
                    label="Phone"
                    value={form.getFieldValue('financePhone')}
                    className="custom-control"
                    required
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <InputCustom
                  label="Email Address"
                  placeholder="Email Address"
                  type="email"
                  value="financeEmail"
                  validators={validationRules.financeEmail}
                  className="custom-control"
                />
              </Col>
            </Row>
            <Form.Item>
              <Button loading={showLoader} type="primary" htmlType="submit" className="ant-btn-block ant-btn-lg">
                Save
              </Button>
            </Form.Item>
          </Form>
        </CustomScroll>
      </div>
    </DashboardPageTemplate>
  );
};

export default LabOrganization;
