import React from 'react';
import { Card, Radio, Form } from 'antd';

const CardRadio = props => {
  const { cartOptions, ...restProps } = props;

  const listItems =
    cartOptions &&
    cartOptions.map(cardOption => {
      const key = JSON.stringify({
        labId: cardOption.labId,
        name: cardOption.name,
        currency: cardOption.currency,
        feesAmount: cardOption.feesAmount,
        feesTax: cardOption.feesTax,
      });
      return (
        <Radio id={cardOption.id} value={key} key={cardOption.id} className="">
          <div className="radiocontent-holder">
            <Card>
              <h5 className="title">{cardOption.name}</h5>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.{' '}
              </p>
            </Card>
          </div>
        </Radio>
      );
    });

  return (
    <Form.Item name="lab">
      <Radio.Group {...restProps} className="ant-radio-withoutLable">
        {listItems}
      </Radio.Group>
    </Form.Item>
  );
};

export default CardRadio;
