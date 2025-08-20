import React, { Fragment, useContext, useEffect, useState } from "react";
import { bottomNavigation } from "../constraints/constants";
import { Link, useLocation } from "react-router-dom";
import MyBets from "./MyBets";
import BetSlipContext from "../context/BetSlipContext";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import AuthContext from "../context/AuthContext";
const BottomNavigation = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  const { showBet, setShowBet } = useContext(BetSlipContext);
  const [activeBet, setActiveBet] = useState(false);

  const handleShowBet = () => {
    // setShowBet(bottomNavigation.some((el) => el.menu === "My Bets"));
  };

  return (
    <>
      <div className="bottom-navigation">
        <ul className="p-sm-3 p-2 m-0 py-sm-2">
          {bottomNavigation?.map((item, index) => {
            return (
              <Fragment key={index}>
                <li
                  className={location.pathname === item?.link ? "active" : ""}
                  onClick={() => {
                    if (item?.id == 5) {
                      if (!isEmpty(user)) {
                        setShowBet(true);
                      } else {
                        navigate('/login');
                      }
                    } else {
                      navigate(item?.link);
                    }
                  }}
                >
                  {/* <Link
                    to={item.link}
                    className="text-decoration-none text-dark"
                  > */}
                  <div className="position-relative">
                    {/* {item?.menu === "My Bets" && (
                      <span className="position-absolute top-0 end-0 bg-danger d-block px-2  text-white rounded-circle">
                        2
                      </span>
                    )} */}
                    <img src={item?.icon} alt="" />
                  </div>
                  <span style={{fontSize:'.7857142857142857rem'}}>{item?.menu}</span>
                  {/* </Link> */}
                </li>
              </Fragment>
            );
          })}
        </ul>
      </div>
      {showBet && <MyBets setShowBet={setShowBet} />}
    </>
  );
};

export default BottomNavigation;
