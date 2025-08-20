import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { apiGet } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import whatsapp from "../assets/images/whatsapp.svg";
import telegram from "../assets/images/telegram.svg";
import livechat from "../assets/images/favicon.ico";
const Footer = () => {
  const location = useLocation();
  const { user, showSidebar, active, setFooterLink } = useContext(AuthContext);
  const navigate = useNavigate();
  const [casinoModel, setCasinoModel] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [icon, setIcon] = useState({});
  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const getData = async () => {
    let hostname = window.location.hostname;
    hostname = hostname.replace(/^www\./, "");
    hostname = hostname.replace(/^ag\./, "");
    const { data } = await apiGet(apiPath?.getIcon, {
      website: "9wkt.win",
      user_id: user ? user?.user?._id : "",
    });
    if (data?.success) {
      setIcon(data?.results);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    if (distance < 5) {
      setCasinoModel(true);
    }
  };
  return (
    <>
     <div className="footer">
        {location?.pathname == "/" && !showSidebar && active == "sports" && (
          
          
          // icon?.whatsappContent!== "" || icon?.telegramContent!== "" || icon?.livechatContent!== "" ?
          <div className="betbtn1">
            {/* {icon?.whatsappContent && icon?.whatsappContent !== "" && ( */}
              <div
              onClick={() => {
                window.open(icon?.whatsappContent?"https://wa.me/"+icon?.whatsappContent:"https://wa.me/+", "_self");
              }}
              >
                <img
                  src={icon?.whatsappIcon?process.env.REACT_APP_API_BASE_URL + icon?.whatsappIcon:whatsapp}
                  alt=""
                />
              </div>
            {/* )} */}
            {/* {icon?.telegramContent && icon?.telegramContent !== "" && ( */}
              <div
                onClick={() => {
                  
                  window.open(icon?.telegramContent?"https://t.me/"+icon?.telegramContent:"https://t.me/+", "_self");
                }}>
                <img
                  src={icon?.telegramIcon?process.env.REACT_APP_API_BASE_URL + icon?.telegramIcon:telegram}
                  alt=""
                />
              </div>
            {/* )}{" "} */}
            {/* {icon?.livechatContent && icon?.livechatContent !== "" && location?.pathname == "/" && ( */}
              <div
                onClick={() => {
                  window.open(icon?.livechatContent, "_self");
                }}
              >
                <img
                  src={icon?.livechatIcon?process.env.REACT_APP_API_BASE_URL + icon?.livechatIcon:livechat}
                  alt=""
                />
              </div>
            {/* )} */}
           
          {/*  {location?.pathname == "/" && (
              <noscript>
                <a
                  href="https://www.livechat.com/chat-with/17022978/"
                  rel="nofollow"
                >
                  Chat with us
                </a>
                , powered by{" "}
                <a
                  href="https://www.livechat.com/?welcome"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  LiveChat
                </a>
              </noscript>
            )}*/}
          </div>
          // :""
          
        )}
        
      </div> 
    </>
  );
};

export default Footer;
