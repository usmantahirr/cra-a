import React, { useRef } from 'react';
import { Button, Radio } from 'antd';
import Carusol from 'react-slick';

function ImgRadioCarusol(props) {
  const { options, ...restProps } = props;

  let slider = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const next = () => {
    slider.slickNext();
  };
  const previous = () => {
    slider.slickPrev();
  };

  const listItems =
    options &&
    options.map(radioOption => {
      return {
        id: radioOption.id,
        listItem: (
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
        ),
      };
    });

  const getCarusolItems = () => {
    const groups = [];
    if (listItems.length) {
      listItems.forEach(element => {
        const group = (
          <Radio.Group key={element.id} {...restProps} className="ant-row ant-row-padding image-selection">
            {element.listItem}
          </Radio.Group>
        );
        groups.push({ id: element + 1, group });
      });
    }
    return groups;
  };

  return (
    (listItems && (
      <div>
        <Carusol
          ref={c => {
            slider = c;
          }}
          {...settings}
        >
          {listItems && getCarusolItems().map(item => <div key={item.id}>{item.group}</div>)}
        </Carusol>
        <div style={{ textAlign: 'center' }}>
          <Button className="button" onClick={previous}>
            Previous
          </Button>
          <Button className="button" onClick={next}>
            Next
          </Button>
        </div>
      </div>
    )) ||
    null
  );
}

export default ImgRadioCarusol;
