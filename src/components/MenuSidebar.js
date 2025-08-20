import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { sidebarData } from "../constraints/constants";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineGlobal } from "react-icons/ai";
import AuthContext from "../context/AuthContext";
import OutsideClickHandler from "react-outside-click-handler";
import { useTranslation } from "react-i18next";
const MenuSidebar = () => {
  let { logoutUser, setShowSidebar, lang } = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowSidebar(false);
      }}
    >
      <div>
        <div className="sidebar-wrapper">
          <div className="top-sidebar mb-3 ps-1 d-flex justify-content-between">
            <strong>{t("Menu")}</strong>
            <p>Bonus Amount : 0.00</p>
            <button
              className="bg-transparent border-0 p-0"
              onClick={() => setShowSidebar(false)}
            >
              <RxCross2 />
            </button>
          </div>
          <ul className="p-0 m-0 mb-3">
            {sidebarData.length > 0 &&
              sidebarData[0].firstLevel.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item?.link} className="text-decoration-none">
                      {item?.icon}{" "}
                      <span>{lang == "bn" ? item?.menubn : item?.menu}</span>{" "}
                      {/* {item?.menu === "Current Bets" && (
                        <strong className="ms-2 bg-yellow d-block p-2 py-0 fs-6 rounded">
                          0
                        </strong>
                      )} */}
                    </Link>
                  </li>
                );
              })}
          </ul>
          <ul className="p-0 m-0 mb-3">
            {sidebarData.length > 0 &&
              sidebarData[1].secondLevel.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item?.link} className="text-decoration-none">
                      {item?.icon}{" "}
                      <span>{lang == "bn" ? item?.menubn : item?.menu}</span>
                    </Link>
                  </li>
                );
              })}
          </ul>

          <ul className="p-0 m-0 mb-3">
            {sidebarData.length > 0 &&
              sidebarData[2].thirdLevel.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item?.link} className="text-decoration-none">
                      {item?.icon}
                      <span>{lang == "bn" ? item?.menubn : item?.menu}</span>
                    </Link>
                  </li>
                );
              })}
          </ul>

          <button onClick={() => logoutUser()} className="logout-button">
            <BiLogOutCircle className="me-2" />
            {t("Logout")}
          </button>
          <div className="time-zone text-center pt-4">
            <AiOutlineGlobal className="me-2 fs-4" />{" "}
            <span>{t("Time_Zone")}：GMT+6:00</span>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default MenuSidebar;
