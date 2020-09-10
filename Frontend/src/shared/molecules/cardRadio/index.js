import React from 'react';
import { Card, Radio } from 'antd';

const CardRadio = props => {
  const { cartOptions, ...restProps } = props;

  const listItems =
    cartOptions &&
    cartOptions.map(cardOption => (
      <Radio id={cardOption.id} value={cardOption.id} key={cardOption.id} className="">
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
    ));

  return (
    <Radio.Group {...restProps} className="ant-radio-withoutLable">
      {listItems}
    </Radio.Group>
  );
};

export default CardRadio;
