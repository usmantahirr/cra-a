import React from 'react';
import { Radio } from 'antd';

function ImageRadio(props) {
  const { options } = props;

  const listItems = options.map(radioOption => (
    <Radio
      id={radioOption.id}
      value={radioOption.value}
      key={radioOption.id}
      className="ant-col ant-col-6 radio-holder"
    >
      <div className="radiocontent-holder">
        <h5>{radioOption.text}</h5>
        <div className="ant-image">
          <img className="ant-image-img" src={radioOption.src} alt="" />
        </div>
      </div>
    </Radio>
  ));
  return <Radio.Group className="ant-row ant-row-padding image-selection">{listItems}</Radio.Group>;
}

export default ImageRadio;
