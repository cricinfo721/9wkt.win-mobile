import React from "react";
import Slider from "react-slick";
import { LoginBanner } from "../Utils/constants";

const LoginSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="login-banner">
        <div>
          <Slider {...settings}>
            {LoginBanner.map((item) => {
              return (
                <div className="slider-items">
                  <figure>
                    <img src={item?.banner} alt="" />
                  </figure>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default LoginSlider;
