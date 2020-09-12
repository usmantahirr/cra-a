import React from 'react';
import { Button, Radio } from 'antd';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    // remember to give it position:absolute
    <div className="carousel-button-group">
      <Button className={currentSlide === 0 ? 'disable' : ''} value="previous" onClick={() => previous()}>
        Previous
      </Button>
      <Button onClick={() => next()}> Next</Button>
    </div>
  );
};

function ImgRadioCarusol(props) {
  const { options, ...restProps } = props;

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
      <Carousel
        arrows={false}
        renderButtonGroupOutside
        customButtonGroup={<ButtonGroup />}
        responsive={responsive}
        // infinite={true}
        keyBoardControl
        customTransition="all .5"
        transitionDuration={500}
        // containerClass="carousel-container"
        // itemClass="carousel-item-padding-40-px"
      >
        {listItems && getCarusolItems().map(item => <div key={item.id}>{item.group}</div>)}
      </Carousel>
      // </Fragment>
    )) ||
    null
  );
}

export default ImgRadioCarusol;
