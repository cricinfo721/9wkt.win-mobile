import React, { useContext, useState } from "react";
import SlotSlider from "./slider/SlotSlider";
import LiveCashino from "./slider/LiveCashino";
import LayoutNew from "../components/shared/LayoutNew";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import AuthContext from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import CurrentNews from "../components/CurrentNews";
import GameSlider from "../components/GameSlider";
import FooterSection from "../components/FooterSection";
import MainBanner from "./slider/MainBanner";
import { HiOutlineRefresh } from "react-icons/hi";
import referIcon from "../assets/images/icon-referral.png";
import PromotionsIcon from "../assets/images/icon-promotion.webp";
import TableEgameSlider from "./slider/TableEgameSlider";
const HomeNew = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, setBr, lang, setEn, messagelist, setAnnouncement,amounutRefresh,refreshAmountLoader,userCoins, } =
    useContext(AuthContext);
  const [show, setShow] = useState(false);
  return (
    <LayoutNew>
      
      <MainBanner />
      <CurrentNews
        message={messagelist}
        setAnnouncement={setAnnouncement}
      />
       {!isEmpty(user) && (
       <div class="home-balance-box">
          <div class="balance balance-row">
          <div class="text"> {user?.user?.username}
            
          {refreshAmountLoader ? (
              <div class="loader-outer">
                <span
                  class="loader-inner-icon"
                  style={{ animationDelay: "0s" }}
                ></span>
                <span
                  class="loader-inner-icon"
                  style={{ animationDelay: ".1s" }}
                ></span>
                <span
                  class="loader-inner-icon"
                  style={{ animationDelay: ".2s" }}
                ></span>
                <span
                  class="loader-inner-icon"
                  style={{ animationDelay: ".3s" }}
                ></span>
                <span
                  class="loader-inner-icon"
                  style={{ animationDelay: ".4s" }}
                ></span>
                <span
                  class="loader-inner-icon"
                  style={{ animationDelay: ".5s" }}
                ></span>
                <span
                  class="loader-inner-icon"
                  style={{ animationDelay: ".6s" }}
                ></span>
                <span
                  class="loader-inner-icon"
                  style={{ animationDelay: ".7s" }}
                ></span>
              </div>
            ) : (
              <span class="amount totalBalanceWallet">
                <i id="locale-util-dicrective-0" >৳ {userCoins?.balance?.toFixed()}</i>
                </span>
            )}
          </div>
         
          <div class="icon refresh" >
              <div onClick={amounutRefresh}>
              <HiOutlineRefresh
                size={20}
                className={refreshAmountLoader ? "refresh-icon" : ""}
              />
              </div>
              </div>
          </div>
          <ul className="">
          <li onClick={() => navigate("/promotions")} className="">
              <div className="payment-box footer-payment-box ">
                <figure>
                  <img src={PromotionsIcon} alt="" />
                </figure>
                <span>
                Promotions
                </span>
              </div>
            </li>
          <li onClick={() => navigate("/refer")} className="">
              <div className="payment-box footer-payment-box ">
                <figure>
                  <img src={referIcon} alt="" />
                </figure>
                <span>
                User Refer
                </span>
              </div>
            </li>
            
          </ul>
        </div>
      )}
      <div className="main">
        
      
        <GameSlider />
        <SlotSlider />
        <LiveCashino />
        <FooterSection />
        
      </div>
      
    </LayoutNew>
  );
};

export default HomeNew;
