import React, { useContext,useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import OutsideClickHandler from "react-outside-click-handler";
import { useTranslation } from "react-i18next";
import {
  casinoMainMenu,
  casinoMenu,
} from "../Utils/constants";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import FlagIcon from "../assets/icons/india-icon.png";
import FlagIconBn from "../assets/icons/bangladesh-flag-round-circle-icon.png";
import PromotionsIcon from "../assets/images/icon-promotion.webp";
import iconAffiliate from "../assets/images/icon-affiliate.png";
import HomeIcon from "../assets/images/icon-home.webp";
import iconTalk from "../assets/images/icon-member-talk.svg";
import iconTelegram from "../assets/images/icon-telegram.svg";
import iconAbous from "../assets/images/icon-abous-us.svg";
import iconFaq from "../assets/images/icon-faq.svg";
import logo from "../assets/images/logo.png";

const MenuSidebarNew = () => {

  let { logoutUser, setShowSidebar,lang ,user, setEn, setBr,launchEGTCasino,
    launchCasino,withoutLogin} = useContext(AuthContext);
  const navigate = useNavigate();
  const setFunc = (type) => {
    setData(
      casinoMenu?.find((res) => {
        {
          return res?.key == type;
        }
      })
    );
    setKey(type);
  };
  const [data, setData] = useState({});
  const [activeClass, SetActiveClass] = useState("");
  const [key, setKey] = useState("");
  useEffect(() => {
    // setData(
    //   casinoMenu?.find((res) => {
    //     {
    //       return res?.key == "sports";
    //     }
    //   })
    // );

    window.addEventListener('scroll', () => {
      
      if(window.scrollY > 180){
       
        SetActiveClass('gamefixed');
      }else{
        SetActiveClass('');
      }
      
   });

  }, []);
  const {t} = useTranslation()
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowSidebar(false);
      }}
    >
      <div>
        <div className="sidebar-wrapper">
          {/* <div className="top-sidebar mb-3 ps-1 d-flex justify-content-between align-items-center">
           
            <button
              className="bg-transparent border-0 p-0"
              onClick={() => setShowSidebar(false)}
            >
              <RxCross2 />
            </button>
          </div> */}
          <div className="sponsor-representation">
      <img 
        alt="UI version logo" 
        className="sponsor-representation__logo" 
        src={logo}
        loading="lazy"
      />
      <div className="sponsor-representation__title">Front of Shirt Partner</div>
      <img 
        alt="Sponsor image" 
        className="sponsor-representation__sponsor" 
        src="https://img.b112j.com/bj/h5/assets/images/sponsor/afc-bournemouth.png?v=1739875429978&source=mcdsrc" 
        loading="lazy"
      />
    </div>
          <ul>
          <li><figure> <img src={HomeIcon} alt=""/></figure><Link to="/" className="text-decoration-none"> <span>{"Home"}</span></Link></li>
          <li><figure><img src={PromotionsIcon}alt=""/></figure><Link to="/promotions" className="text-decoration-none"> <span> Promotions </span></Link></li>
          </ul>
          <ul>
            <div className="title">Games</div>
        {casinoMainMenu?.map((item,index) => {
          return (
            <li key={index}  onClick={() => {setFunc(item?.type); }}className={`${key == item?.type ? "active" : ""}`}>
              <figure><img src={item?.icons} alt=""/></figure>
              <a className="text-decoration-none"> <span>{lang == "bn" ? item?.titlebn : item?.title}</span></a>
          </li>
          );
        })}
        </ul>
        <div className="title">Others</div>
        <ul>
          <li> <figure><img src={iconTalk} alt=""/></figure><Link to="#" className="text-decoration-none">   24/7 Live Chat  </Link></li>
          <li> <figure><img src={iconTelegram} alt=""/></figure><Link to="#" className="text-decoration-none"> Telegram Support  </Link></li>
          <li> <figure><img src={iconAffiliate} alt=""/></figure><Link to="https://aff.9wkt.win/" className="text-decoration-none">   Affiliate  </Link></li>
          <li> <figure><img src={iconAbous} alt=""/></figure><Link to="#" className="text-decoration-none">   About Us  </Link></li>
          <li> <figure><img src={iconFaq} alt=""/></figure><Link to="#" className="text-decoration-none">   FAQ  </Link></li>

        </ul>
       
        <ul>
        
        {!isEmpty(user) ? (
          <>
          <li className="language-select">
          <div
            className="language-select-div"
            onClick={() => {
             
              setBr();
              
            }}
          >
            <img src={FlagIconBn} alt="" />{" "}
            <p>বাংলা</p> 
          </div>
          <div
            className="language-select-div"
            onClick={() => {
              
                setEn();
              
            }}
          >
            <img src={ FlagIcon } alt="" />{" "}
            <p>English</p>
          </div>
        </li>
            
          </>):("")}</ul>
         
           
        </div>
        {
          key!="" &&
          <div class="menu-second">
          <ul class="menu-second-ul active">
          {data?.array?.map((res) => {
              return (
                  <li class=""   
                    onClick={() => {
                    if (!isEmpty(user)) {
                      if (data?.key == "exchange") {
                        window.open(res?.link, "_self");
                      } else {
                        if (!isEmpty(user)) {
                          if (res?.gameTypeCheck == "platForm") {
                            launchCasino({
                              platForm: res?.platForm,
                              gameType: res?.gameType,
                              casinoType: res?.casinoType,
                            });
                          } else if (res?.gameType == "egtGame") {
                            launchEGTCasino({
                              platForm: res?.platForm,
                              gameType: res?.gameTypeNew,
                              casinoType: res?.casinoType,
                            });
                          } else if (!isEmpty(res?.gameid)) {
                            launchEGTCasino({
                              platForm: res?.platForm,
                              gameType: res?.gameType,
                              casinoType: res?.casinoType,
                              gameid: res?.gameid,
                            });
                          } else {
                            if (
                              res?.platForm !== "" &&
                              res?.gameType !== "" &&
                              res?.casinoType !== ""
                            ) {
                              launchCasino({
                                platForm: res?.platForm,
                                gameType: res?.gameType,
                                casinoType: res?.casinoType,
                              });
                            }
                          }
                        } else {
                          navigate("/login");
                        }
                      }
                    } else {
                      withoutLogin()
                    }
                  }}>
                  <figure><img src={res?.image} alt=""/></figure><p>{res?.title}</p>
                  </li>
              );
            })}
        </ul>
      </div>
        }
       
      </div>
      
    </OutsideClickHandler>
  );
};

export default MenuSidebarNew;
