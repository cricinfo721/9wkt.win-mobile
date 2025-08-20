import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { isEmpty } from "lodash";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../../Utils/apiFetch";
import apiPath from "../../Utils/apiPath";
import { useTranslation } from "react-i18next";

const TableEgameSlider = () => {
  const { t } = useTranslation();
  const { lang, user, launchEGTCasino, launchCasino, withoutLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getData = async () => {
    const { status, data } = await apiPost(apiPath.getBanner, {
      type: "home_mid",
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
    <>
    {
      data.length>0 &&
    
      <div className="common-slider">
        <div className="heading-block">
          <h5>{t("Favourites")}</h5>
          {/* <Link to="/">{t("See_All")}</Link> */}
        </div>

        <div className="common-slider-box">
          
        {data?.map((item) => {
              return (
                <div
                  onClick={() => {
                    if (!isEmpty(user)) {
                    <></>
                    } else {
                      withoutLogin();
                    }
                  }}
                  className="slider-items"
                >
                  <figure className="mb-0">
                    <img  src={
                        process.env.REACT_APP_API_BASE_URL + item?.banner_path
                      } alt="" />
                  </figure>
                  
                </div>
              );
            })}
          
        </div>
      </div>
}
    </>
  );
};

export default TableEgameSlider;
