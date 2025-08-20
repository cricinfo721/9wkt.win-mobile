import React, { useEffect, useState,useContext } from "react";
import Slider from "react-slick";
import { apiGet, apiPost } from "../../Utils/apiFetch";
import apiPath from "../../Utils/apiPath";
import AuthContext from "../../context/AuthContext";

const MainBanner = () => {
  const {downloadBar} = useContext(AuthContext);
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    className: "center",
    centerMode: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          centerMode: true,
        },
      },
    ],
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  const [data, setData] = useState([]);
  const getData = async () => {
    const { status, data } = await apiPost(apiPath.getBanner, {
      type: "home_top",
    });
    if (status == 200) {
      if (data?.success) {
        setData(data?.results?.banners);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div  className={downloadBar?"main-banner":"main-banner banner-bar-height"}>
      {" "}
      <Slider {...settings}>
        {data?.length > 0 &&
          data?.map((item) => {
            return (
              <div className="slider-items-banner">
                <figure className="mb-0">
                  <img
                    style={{
                      width: "250px",
                      height: "113px",
                    }}
                    src={process.env.REACT_APP_API_BASE_URL + item?.banner_path}
                    alt=""
                  />
                </figure>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default MainBanner;
