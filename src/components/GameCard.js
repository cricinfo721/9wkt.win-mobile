import React, { useContext } from "react";
import AuthProvider from "../context/AuthContext";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const GameCard = ({ item, cartType, res }) => {
  let { launchEGTCasino, user, launchCasino } = useContext(AuthProvider);
  const navigate = useNavigate();
  return (
    <div
      className="game-card position-relative"
      onClick={() => {
        if (!isEmpty(user)) {
          if (
            res?.platForm !== "" &&
            res?.gameType !== "" &&
            res?.casinoType !== ""
          ) {
            launchCasino({
              platForm: res?.platForm,
              gameType: res?.gameType,
              casinoType: res?.casinoType,
              table: res?.table,
            });
          }else{
            
          }
        } else {
          navigate("/login");
        }
      }}
    >
      <LazyLoadImage alt={res?.img} effect="opacity" src={res?.img} />
      <p>{res?.type +" "+res?.name}</p>
    </div>
  );
};

export default GameCard;
