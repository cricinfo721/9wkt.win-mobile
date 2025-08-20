import React from "react";
import Slider from "react-slick";
import { bannerSlider } from "../constraints/constants";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const navigate = useNavigate();

  return (
    <div className="home-banner-sec">
      <Slider {...settings}>
        {bannerSlider.map((item, index) => {
          return (
            <>
              <div >
                <img src={item?.img} alt="" />
              </div>
            </>
          );
        })}
      </Slider>
    </div>
  );
};

export default HomeBanner;
