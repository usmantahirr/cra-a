import React from 'react';
import { Card, Radio } from 'antd';

const CardRadio = props => {
  const { cartOptions } = props;

  const listItems = cartOptions.map(cardOption => (
    <Radio id={cardOption.id} value={cardOption.title} key={cardOption.id} className="ant-col-6 radio-holder">
      <div className="radiocontent-holder">
        <h5>{cardOption.title}</h5>
        <Card style={{ width: 300 }}>
          <p>{cardOption.content}</p>
        </Card>
      </div>
    </Radio>
  ));

  return <Radio.Group className="ant-row image-selection">{listItems}</Radio.Group>;
};

export default CardRadio;
