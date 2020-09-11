import React from 'react';
import { Card, Radio } from 'antd';

const CardRadio = props => {
  const { cartOptions, ...restProps } = props;

  const listItems =
    cartOptions &&
    cartOptions.map(cardOption => (
      <Radio id={cardOption.id} value={cardOption.id} key={cardOption.id} className="ant-col-6 radio-holder">
        <div className="radiocontent-holder">
          <h5>{cardOption.name}</h5>
          <Card style={{ width: 300 }}>
            <p>{cardOption.name}</p>
          </Card>
        </div>
      </Radio>
    ));

  return (
    <Radio.Group {...restProps} className="ant-row image-selection">
      {listItems}
    </Radio.Group>
  );
};

export default CardRadio;
