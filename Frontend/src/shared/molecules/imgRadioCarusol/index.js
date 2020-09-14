import React, { createRef, Fragment } from 'react';
import { Carousel, Button, Radio } from 'antd';

function ImgRadioCarusol(props) {
  const { options, isCarusol = true, pageSize = 4, ...restProps } = props;

  const carusolRef = createRef();

  const handleNext = () => carusolRef.current.next();

  const handlePrev = () => carusolRef.current.prev();

  const listItems =
    options &&
    options.map(radioOption => (
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

  const getCarusolItems = () => {
    const groups = [];
    if (listItems.length) {
      const totalPages = Math.ceil(listItems.length / pageSize);
      const pages = Array(totalPages)
        .fill()
        .map((element, index) => index);
      pages.forEach((element, pageNo) => {
        const elements = listItems.slice(pageNo * pageSize, (pageNo + 1) * pageSize);
        const group = (
          <Radio.Group key={element} {...restProps} className="ant-row ant-row-padding image-selection">
            {elements}
          </Radio.Group>
        );
        groups.push({ id: element, group });
      });
    }
    return groups;
  };

  return isCarusol ? (
    <Fragment>
      <Carousel ref={carusolRef}>
        {listItems && getCarusolItems().map(item => <div key={item.id}>{item.group}</div>)}
      </Carousel>
      <Button onClick={handlePrev}>Previous</Button>
      <Button onClick={handleNext}>Next</Button>
    </Fragment>
  ) : (
    <Radio.Group {...restProps} className="ant-row ant-row-padding image-selection">
      {listItems}
    </Radio.Group>
  );
}

export default ImgRadioCarusol;
