import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FlagIcon from "../assets/icons/india-icon.png";
import FlagIconBn from "../assets/icons/bangladesh-flag-round-circle-icon.png";
import { isEmpty } from "lodash";
import AuthContext from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {footerAccountMenu } from "../Utils/constants";


const FooterNew = () => {
  const { user, lang, setEn, setBr } = useContext(AuthContext);

  const { t } = useTranslation();
  const navigate = useNavigate();
  // console.log("footerAccountMenu",footerAccountMenu)
  return (
    <div className="footer-new">
      <ul>
        {isEmpty(user) ? (
          <>
            <li className="language-select">
              <div
                className="language-select-div"
                onClick={() => {
                  if (lang == "bn") {
                    setEn();
                  } else {
                    setBr();
                  }
                }}
              >
                <img src={lang == "bn" ? FlagIcon : FlagIconBn} alt="" />{" "}
              
                {lang == "bn" ? "English" : "Bangla"}
              </div>
            </li>
            <li className="register-button">
              <Link to="/register">{t("Sign_up")}</Link>
            </li>
            <li className="login-button">
              <Link to="/login">{t("Login")}</Link>
            </li>
          </>
        ) : (
          <>
            {footerAccountMenu.length > 0 &&
              footerAccountMenu?.map((res) => {
                return(
                <li onClick={() => navigate(res?.link)} className="">
                  <div className="payment-box footer-payment-box ">
                    <figure>
                      <img src={res?.icons} />
                    </figure>
                    <span>{res?.title}</span>
                  </div>
                </li>);
              })}
          </>
         )} 
      </ul>
    </div>
  );
};

export default FooterNew;
