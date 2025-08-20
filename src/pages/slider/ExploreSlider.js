import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Data } from "../../utils/constants/Constants";

const ExploreSlider = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 5.1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="common-slider explore-slider">
        <div className="heading-block">
          <h3>Explore</h3>
          <Link to="/">See All</Link>
        </div>

        <div>
          <Slider {...settings}>
            {Data.map((item) => {
              return (
                <div className="slider-items border-0">
                  <figure>
                    <img src={item?.icons} alt="" />
                  </figure>
                  <div>
                    <span>{item?.title}</span>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ExploreSlider;
