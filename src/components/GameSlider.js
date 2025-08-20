import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import {
  casinoMainMenu,
  casinoMenu,
} from "../Utils/constants";
import AuthContext from "../context/AuthContext";
import { isEmpty,toLower } from "lodash";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
const GameSlider = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    autoplay: false,
    arrows: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
    ],
  };
  const ref = useRef();
  const [data, setData] = useState({});
  const [getHotData, setHotData] = useState({});
  const [activeClass, SetActiveClass] = useState("");
  const navigate = useNavigate();
  const {
    lang,
    user,
    launchEGTCasino,
    launchCasino,
    logoutUser,
    withoutLogin,
    setShowDownloadBar,
    downloadBar
  } = useContext(AuthContext);
  const [key, setKey] = useState("sports");
  const [slideClass, setSlideClass] = useState("slide-left");

  useEffect(() => {
    setData(
      casinoMenu?.find((res) => {
        {
          return res?.key == "sports";
        }
      })
    );

    window.addEventListener('scroll', () => {
      if(window.scrollY > 180){
       
        SetActiveClass('gamefixed');
      }else{
        SetActiveClass('');
      }
      
   });

  }, []);

  const setFunc = (type) => {
    setSlideClass("");
    setData(
      casinoMenu?.find((res) => {
        {
          return res?.key == type;
        }
      })
    );
    setKey(type);
    setTimeout(() => {
      setSlideClass("slide-left");
  }, 10);
    
  };

  return (
    <div className="home-tabing-slider">
      <div  className={downloadBar?"payment-sec "+ activeClass:"payment-sec fixed-bar-height "+ activeClass} >
        {casinoMainMenu?.map((item) => {
          return (
            <div
              onClick={() => {
                
                  if (!isEmpty(item?.link)) {
                    navigate(item?.link);
                  } else {
                    setFunc(item?.type);
                  }
                
              }}
              className={`payment-box ${key == item?.type ? "active" : ""}`}
            >
              <figure>
                <img
                  src={item?.icons}
                  alt=""
               
                />
              </figure>
              <span>{lang == "bn" ? item?.titlebn : item?.title}</span>
            </div>
          );
        })}
      </div>
      {slideClass=="slide-left" &&
      <div className="main-slider-div">
        <div className="main-slider-inner-div ">
          <div>
            <h5>{lang == "bn" ? data?.titlebn : data?.title}</h5>
          </div>
        
          <ul className={key=="exclusive"?"exclusive "+ slideClass: slideClass } >
            { data?.array?.map((res) => {
              return (
                <li> 
                  <div
                     onClick={() => {
                      if (!isEmpty(user)) {
                        if (res?.gameTypeCheck == "sports") {
                          window.open(res?.link, "_self");
                          } 
                       else if (data?.key == "sports") {                          
                              launchCasino({
                                platForm: res?.platForm,
                                gameType: res?.gameType,
                                casinoType: res?.casinoType,
                                isLobbyTrue:res?.isLobbyTrue
                              });
                            
                        } 
                        else if(res?.gameTypeCheck == "platForm") {
                          launchCasino({
                            platForm: res?.platForm,
                            gameType: res?.gameType,
                            casinoType: res?.casinoType,
                            isLobbyTrue:res?.isLobbyTrue
                          });
                        }
                       
                        else if(data?.key == "exclusive"){
                          launchCasino({
                            platForm: res?.platForm,
                            gameType: res?.gameType,
                            casinoType: res?.casinoType,
                          });
                        } else{
                          if (!isEmpty(user)) {
                            let subCategory=res?.platForm=="EVOLUTION"?"EVO":res?.platForm=="SEXYBCRT"?"SEXY":res?.platForm;
                            navigate("/casino?header="+toLower(res?.key)+"&subCasino="+subCategory)
                            
                          } else {
                            navigate("/login");
                          }
                        }
                      } else {
                       navigate("/login");
                      }
                    }}
                  >{
                    res?.image &&
                    <span>
                      <LazyLoadImage
                        effect="opacity"
                        alt={res?.img}
                        src={res?.image}
                      />
                    </span>
                  }
                    {/* {data?.key !== "exclusive"&& */}
                    <p>{res?.title}</p>
                    {/* } */}
                  </div>
                </li>
              );
            })}
             
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default GameSlider;
