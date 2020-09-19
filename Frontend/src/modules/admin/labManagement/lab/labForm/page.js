import React, { useEffect } from 'react';
import { Form, Col, Row } from 'antd';
import CustomScroll from 'react-custom-scroll';
// import { useTranslation } from 'react-i18next';
import Button from '../../../../../shared/atoms/buttons';
import InputCustom from '../../../../../shared/atoms/forms/input';
import DashboardPageTemplate from '../../../../../shared/templates/dashboardTemplate';
import CustomTelInput from '../../../../../shared/atoms/inputs/customTelInput';
import { CustomSelect, CustomSwitch, CustomTimePicker } from '../../../../../shared/atoms/forms';
import CountryStateCityZipCode from '../../../../../shared/molecules/relatedFormFields/countryStateCityZipCode';
import WeekDaysDropdown from '../../../../../shared/atoms/weekDaysDropdown';

const LabOrganization = ({
  validationRules,
  handleSubmit,
  showLoader,
  formData,
  labGroups,
  countryStateCityZipCode,
}) => {
  // const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...formData });
  }, [formData]);

  return (
    <DashboardPageTemplate>
      <div className="content-scrollbar">
        <CustomScroll heightRelativeToParent="100%">
          <Form form={form} layout="vertical" name="labOrganization" onFinish={handleSubmit}>
            <h1 className="inner-heading">Lab Info</h1>
            <Row className="ant-row-padding">
              <Col span={12}>
                <InputCustom
                  label="Lab Name"
                  placeholder="Lab Name"
                  type="text"
                  value="labName"
                  validators={validationRules.labName}
                  className="custom-control"
                />
              </Col>
              <Col xs={24} md={12}>
                <Form.Item className="custom-item" label="Lab Group" {...validationRules.labGroup}>
                  <CustomSelect
                    showSearch
                    allowClear
                    placeholder="Lab Group"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    options={labGroups.map(c => ({ id: c.key, text: c.value, value: c.value }))}
                  />
                </Form.Item>
              </Col>
              <CountryStateCityZipCode form={form} {...countryStateCityZipCode} />
            </Row>
            <h1 className="inner-heading">Contact Info</h1>
            <Row className="ant-row-padding">
              <Col span={24}>
                <InputCustom
                  label="Lab Address"
                  placeholder="Lab Address"
                  type="text"
                  value="labAddress"
                  validators={validationRules.labAddress}
                  className="custom-control"
                />
              </Col>
              <Col span={12}>
                <Form.Item {...validationRules.phone} className="custom-item">
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
                  validators={validationRules.email}
                  className="custom-control"
                />
              </Col>
              <Col span={24}>
                <Form.Item
                  name="informationVisible"
                  valuePropName="checked"
                  label="Information Visible"
                  className="custom-item"
                >
                  <CustomSwitch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <InputCustom
                  label="Latitude"
                  placeholder="Latitude"
                  type="text"
                  value="latitude"
                  validators={validationRules.latitude}
                  className="custom-control"
                />
              </Col>
              <Col span={12}>
                <InputCustom
                  label="Longitude"
                  placeholder="Longitude"
                  type="text"
                  value="longitude"
                  validators={validationRules.longitude}
                  className="custom-control"
                />
              </Col>
            </Row>
            <h1 className="inner-heading">Lab Calendar</h1>
            <Row className="ant-row-padding">
              <WeekDaysDropdown validationRules={validationRules.weekStartDay} label="Week Start Day" />
              <WeekDaysDropdown validationRules={validationRules.weekEndDay} label="Week End Day" />
              <Col span={12}>
                <Form.Item {...validationRules.openingTime} label="Opening Time" className="custom-item">
                  <CustomTimePicker />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...validationRules.closingTime} label="Closing Time" className="custom-item">
                  <CustomTimePicker />
                </Form.Item>
              </Col>
            </Row>

            {formData && formData.labId && (
              <Row className="ant-row-padding">
                {/* <h2>Lab Status</h2> */}
                <Col span={12}>
                  <Form.Item name="isActive" valuePropName="checked" label="Operating" className="custom-item">
                    <CustomSwitch />
                  </Form.Item>
                </Col>
                {/* <h2>Lab Locked/Unlocked</h2> */}
                <Col span={12}>
                  <Form.Item name="isLocked" valuePropName="checked" label="Lab Locked" className="custom-item">
                    <CustomSwitch />
                  </Form.Item>
                </Col>
              </Row>
            )}
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
