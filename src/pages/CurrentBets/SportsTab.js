import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
const SportsTab = ({ setTab, tab ,type}) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.2,
    slidesToScroll: 1,
  };
  const {t} = useTranslation()
  return (
    <div className="sports-tab-panel py-2 px-0">
    <Slider {...settings}>
      <div>
        <h3
          onClick={() => setTab("exchange")}
          className={tab == "exchange" ? "active" : ""}
        >
          Exchange
        </h3>
      </div>
      <div>
        <h3
          onClick={() => setTab("bookmaker")}
          className={tab == "bookmaker" ? "active" : ""}
        >
          Bookmaker
        </h3>
      </div>
      <div>
        <h3
          onClick={() => setTab("fancy")}
          className={tab == "fancy" ? "active" : ""}
        >
          Fancybet
        </h3>
      </div>
      <div>
        <h3
          onClick={() => setTab("sportsBook")}
          className={tab == "sportsBook" ? "active" : ""}
        >
          Sportsbook
        </h3>
      </div>
      <div>
        <h3
          onClick={() => setTab("tie")}
          className={tab == "tie" ? "active" : ""}
        >
          Tie
        </h3>
      </div>
      <div>
        <h3
          onClick={() => setTab("toss")}
          className={tab == "toss" ? "active" : ""}
        >
          Toss
        </h3>
      </div>
      {type !== 'casino' &&
      <div>
        <h3
          onClick={() => setTab("casino")}
          className={tab == "casino" ? "active" : ""}
        >
          Casino
        </h3>
      </div>}
      <div>
        <h3
          onClick={() => setTab("parly")}
          className={tab == "parly" ? "active" : ""}
        >
          Parlay
        </h3>
      </div>
    </Slider>
  </div>
  );
};

export default SportsTab;
