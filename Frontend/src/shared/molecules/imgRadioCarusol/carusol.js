import React, { useRef } from 'react';
import { Button, Radio } from 'antd';
import Carusol from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ImgRadioCarusol(props) {
  const { options, ...restProps } = props;

  let slider = useRef(null);

  const settings = {
    centerPadding: '30px',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
          <Radio id={radioOption.id} value={radioOption.value} key={radioOption.id} className="radio-holder">
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
          <Radio.Group key={element.id} {...restProps} className="image-selection">
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
      <div className="slickSlider">
        <Carusol
          ref={c => {
            slider = c;
          }}
          {...settings}
        >
          {listItems && getCarusolItems().map(item => <div key={item.id}>{item.group}</div>)}
        </Carusol>
        <div className="slickArrows">
          <Button className="arrow arrow-left" onClick={previous}>
            Previous
          </Button>
          <Button className="arrow arrow-right" onClick={next}>
            Next
          </Button>
        </div>
      </div>
    )) ||
    null
  );
}

export default ImgRadioCarusol;
