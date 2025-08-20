import React, { useContext, useEffect, useState } from "react";
import Footer from "../Footer";
import { Outlet, useLocation } from "react-router-dom";
import {
  bottomNavigation,
  showMenuUsingPath,
  sidebarData,
} from "../../constraints/constants";
import BetSlipContext from "../../context/BetSlipContext";
import AuthContext from "../../context/AuthContext";
import { isEmpty } from "lodash";
import Message from "../Message";
import Calendar from "../Calendar";
import Loader from "../Loader";
import CurrentNews from "../CurrentNews";
import Announcement from "../Announcement";
import FooterLink from "../FooterLink";
import HeaderNew from "../HeaderNew";
import FooterNew from "../FooterNew";
const LayoutComponent = (props) => {
  const location = useLocation();
  const { showBetDialog, message } = useContext(BetSlipContext);
  const { showDate, messagelist, announcement, setAnnouncement, footerLink } =
    useContext(AuthContext);
  const { children, visibilityType, page } = props;

  return (
    <div className="main-outer">
      <div
        className={
          visibilityType
            ? "inner-container"
            : page == "change"
            ? "inner-container login-panel login-panel-without"
            : "inner-container login-panel"
        }
      >
        <main id="main">
          <Outlet />
          {visibilityType && <HeaderNew />}
          {location?.pathname == "/sports" && messagelist?.length > 0 && (
            <CurrentNews
              message={messagelist}
              setAnnouncement={setAnnouncement}
            />
          )}
          {children}
          <Footer />
          <FooterNew />
          {showDate?.status && !isEmpty(showDate?.type) && <Calendar />}
          {announcement && <Announcement data={messagelist} />}
          {message?.status && <Message />}
          {footerLink?.status && <FooterLink />}
          <Loader />
        </main>
      </div>
    </div>
  );
};

export default LayoutComponent;
