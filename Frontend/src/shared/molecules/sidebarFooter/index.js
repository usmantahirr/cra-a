import React from 'react';
import { Form, Image, Row } from 'antd';

import { CustomSelect } from '../../atoms/forms';
import Button from '../../atoms/buttons';
import styles from './style.module.scss';
import Logger from '../../modules/logger';

const SidebarFooter = () => {
  const [form] = Form.useForm();
  // TODO: create language dropdown
  return (
    <div className={styles.sidebarFooter}>
      <Row>
        <Form
          form={form}
          name="register"
          onFinish={vals => {
            Logger.log(vals);
          }}
        >
          <Form.Item>
            <CustomSelect
              name="language"
              defaultValue="en"
              options={[
                {
                  text: 'English',
                  value: 'en',
                  id: '1',
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Row>
      <Row>
        <Button type="primary">
          <Image src="/assets/icons/headphones.png" preview={false} /> Speak to us!
        </Button>
      </Row>
    </div>
  );
};

export default SidebarFooter;
