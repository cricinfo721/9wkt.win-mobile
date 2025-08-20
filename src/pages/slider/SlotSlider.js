import React, { useContext } from "react";
import { Link, useNavigation } from "react-router-dom";
import { SlotData } from "../../Utils/constants";
import { useTranslation } from "react-i18next";
import AuthContext from "../../context/AuthContext";
import { isEmpty } from "lodash";

const SlotSlider = () => {
  
  const { t } = useTranslation();
  const { lang, user, launchEGTCasino, launchCasino,withoutLogin,dolaunchCasinoNew } = useContext(AuthContext);
  const navigate = useNavigation();
  return (
    <>
      <div className="common-slider">
        <div className="heading-block">
          <h5>{t("Favourites")}</h5>
          {/* <Link to="/">{t("See_All")}</Link> */}
        </div>

        <div className="common-slider-box">
          
          
            {SlotData.map((item) => {
              return (
                <div
                  onClick={() => {
                      if (!isEmpty(user)) {
                        if (item?.gameTypeCheck == "platForm") {
                          launchCasino({
                            platForm: item?.platForm,
                            gameType: item?.gameType,
                            casinoType: item?.casinoType,
                          });
                        }  else {
                         
                          dolaunchCasinoNew(item);
                          
                        }
                      } else {
                        withoutLogin()
                      }
                  }}
                  className="slider-items"
                >
                  <figure className="mb-0">
                    <img src={item?.icons} alt="" style={{width: `100%`}} />
                  </figure>
                  {/* <figcaption>
                    <h6>{lang == "bn" ? item?.titlebn : item?.title}</h6>
                   
                  </figcaption> */}
                </div>
              );
            })}
          
        </div>
      </div>
    </>
  );
};

export default SlotSlider;
