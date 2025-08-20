import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
// import MenuListing from "../../components/MenuListing";
import { FeaturedGames } from "../../Utils/constants";
import { useTranslation } from "react-i18next";
import AuthContext from "../../context/AuthContext";
import { isEmpty } from "lodash";

const LiveCashino = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    autoplay: false,
    arrows: false,
    slidesToShow: 2.3,
    slidesToScroll: 1,
  };
  const { t } = useTranslation();
  const { lang, user, launchEGTCasino, launchCasino,withoutLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  const handleOpen = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className="common-slider">
        <div className="heading-block">
          <h5>{("Featured Games")}</h5>
          {/* <Link to="/">{t("See_All")}</Link> */}
        </div>

        <div className="common-slider-box slot-slider-b ">
         
            {FeaturedGames.map((item) => {
              return (
                <div
                  className={ "slider-items pic"}
                 
                  onClick={() => {
                    if (!isEmpty(user)) {
                      if (item?.gameTypeCheck == "platForm") {
                        launchCasino({
                          platForm: item?.platForm,
                          gameType: item?.gameType,
                          casinoType: item?.casinoType,
                        });
                      }else {
                        if (
                          item?.platForm !== "" &&
                          item?.gameType !== "" &&
                          item?.casinoType !== ""
                        ) {
                          launchCasino({
                            platForm: item?.platForm,
                            gameType: item?.gameType,
                            casinoType: item?.casinoType,
                          });
                        }
                      }
                    } else {
                      withoutLogin();
                    }
                  }}
                >
                  <figure className="mb-0">
                    <div className={item?.allOfer && "all-offer-link"}>
                      {item?.allOfer ? (
                        <img src="../assets/images/arrow-pink.png" alt="" />
                      ) : (
                        <img
                          
                          src={item?.icons}
                          alt=""
                        />
                      )}
                    </div>
                  </figure>

                  <figcaption>
                    <h6 className={item.allOfer && "text-center"}>
                      {lang == "bn"
                        ? item?.titlebn
                        : item?.title || item?.allOfer}
                    </h6>
                  </figcaption>
                </div>
              );
            })}
         
        </div>
      </div>

      {/* <MenuListing sidebar={sidebar} handleOpen={handleOpen} /> */}
    </>
  );
};

export default LiveCashino;
