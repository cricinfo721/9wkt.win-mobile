import React, { useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import appdownloadicon from "../assets/images/header-appdownload-icon.svg"
import headerserviceicon from "../assets/images/header-service-icon.svg"
import { isEmpty } from "lodash";
import AuthContext from "../context/AuthContext";
import {
  MdArrowBackIosNew,
  MdKeyboardArrowLeft,
  MdOutlineSubject,
} from "react-icons/md";
import MenuSidebar from "./MenuSidebar";
import MenuSidebarNew from "./MenuSidebarNew";
import { HiOutlineRefresh } from "react-icons/hi";
import { useTranslation } from "react-i18next";
// import ninebajiApk from "../assets/images/9wkt.win.apk";
 import crose from "../assets/images/cross-black.svg";
//  import downloadapp from "../assets/images/favicon.ico";
 import logoutImg from "../assets/images/logout.svg";
 import bournemouth from "../assets/images/bournemouth.png";
 import bologna from "../assets/images/bologna.png";
const HeaderNew = () => {
  const {
    user,
    handleShowSidebar,
    showSidebar,
    amounutRefresh,
    refreshAmountLoader,
    userCoins,
    loginUser,
    setShowDownloadBar,
    downloadBar,
    logoutUser
  } = useContext(AuthContext);
  const navigate = useNavigate()
  const { t } = useTranslation();
  return (
    <>
    {/* {
      downloadBar && 
      <div class="download-bar">
        <img width="15" height="15" src={crose} alt="download" class="mr-2 crose-icon" onClick={() => setShowDownloadBar(false)}/>
          <img width="32" height="32" src={downloadapp} alt="download" class="mr-2 c-radis" />
            <div class="mr-1 col">
              <b>{t("DOWNLOAD_APP")}</b>
            </div>
            <button data-v-3b7d3367="" type="button" class="pa-2 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default download-bar-button subtitle-1">
              <a class="v-btn__content" href={"#"} download="Melbet" target='_blank'>DOWNLOAD</a>
              </button>
    </div>
    } */}
      <div className="login-header-new">
        <div className="login-reg-wrapper">
        <button
                className="bg-transparent border-0 text-white"
                onClick={() => handleShowSidebar()}
              >
                <MdOutlineSubject className="fs-4" />
              </button>
              <figure onClick={() => navigate("/")}>
            {/* {isEmpty(user) ? (
            <img
              style={{
                height: "50px",
              }}
              src={logo}
              alt=""
            />):  */}
            <img
              style={{
                height: "32px",
              }}
              src={logo}
              alt=""
            />
            {/* } */}
            <div class="hd-spon hd-spon--ani">
              <ul class="hd-spon__icon">
                <li>
                  <img src={bournemouth} alt="icon-sponsor" class="spon-icon" />
                  <img src={bologna} alt="icon-sponsor" class="spon-icon" />
                </li>
                <li>
                  <img src={bologna} alt="icon-sponsor" class="spon-icon" />
                  <img src={bournemouth} alt="icon-sponsor" class="spon-icon" />
                </li>
              </ul>
            </div>
          </figure>
          {isEmpty(user) ? (
          
             <div class="desktop-log-reg">
            <button type="button" class="v-btn__content2" onClick={()=>navigate("/login")} >Login</button>
            <button type="button" class="v-btn__content1" onClick={()=>navigate("/register")}>Register Now</button>
            </div>
            
          ) : (
            
        
            <div className="align-items-lg-start for-ref after-login">
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
              <>
              <div className="header-outer">
                <div className="paise" style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: "10px" }}>
                    <span>{user?.user?.username}</span>
                    <div className="d-flex align-items-center">
                      <strong className="header-font-size">
                      ৳{" "}
                        <span style={{ marginLeft: "3px", color: "white" }}>
                          {userCoins?.balance?.toFixed()}
                        </span>
                      </strong>
                      <strong className="header-font-size">
                        Exp{" "}
                        <span
                          className="text-white"
                          style={{ marginLeft: "3px", fontWeight: "700" }}
                        >
                          ({userCoins?.exp?.toFixed()})
                        </span>
                      </strong>
                    </div>
                  </div>
                  <div onClick={amounutRefresh}>
                    <HiOutlineRefresh
                      size={20}
                      className={refreshAmountLoader ? "refresh-icon" : ""}
                    />
                  </div>
                </div>
                <div class="desktop-log-reg">
                      <button type="button" class="v-btn__content2 deposite-d" onClick={()=>navigate("/deposit")} >+</button>
                     
                  </div>
              </div>
              <div class="desktop-log-reg">
              <span className="v-btn__content3" onClick={() => logoutUser()} title="Logout"><img src={logoutImg}/></span>
             
          </div>
          </>
            )}
          </div>
          )}
          <div className="header-right-btn-group">
          
            <a href={"#"}  download="9wkt.win" target='_blank'><img src={appdownloadicon} /><span>App</span></a>
            <a href={isEmpty(user)?"/login":"/customer-support"}><img src={headerserviceicon}/><span >Help</span></a>
            </div>
        </div>
        {showSidebar && (
          <MenuSidebarNew
            cancelMenu={handleShowSidebar}
            showSidebar={showSidebar}
          />
        )}

        {showSidebar && (
          <div className="overlay" onClick={() => handleShowSidebar()}></div>
        )}
      </div>
    </>
  );
};

export default HeaderNew;
