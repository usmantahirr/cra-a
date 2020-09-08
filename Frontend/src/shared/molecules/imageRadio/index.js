import React from 'react';
import { Radio } from 'antd';

function ImageRadio(props) {
  const { imageOptions } = props;

  const listItems = imageOptions.map(imageOption => (
    <Radio id={imageOption.id} value={imageOption.title} key={imageOption.id} className="ant-col-6 radio-holder">
      <div className="radiocontent-holder">
        <h5>{imageOption.title}</h5>
        <div className="ant-image">
          <img className="ant-image-img" src={imageOption.src} alt="" />
        </div>
      </div>
    </Radio>
  ));
  return <Radio.Group className="ant-row image-selection">{listItems}</Radio.Group>;
}

export default ImageRadio;
