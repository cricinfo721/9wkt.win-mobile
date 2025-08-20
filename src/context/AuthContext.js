import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { apiGet, apiPost } from "../Utils/apiFetch";
import { pick, isEmpty } from "lodash";
import apiPath from "../Utils/apiPath";
import { useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { io } from "socket.io-client";
import BetSlipContext from "./BetSlipContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import i18n from "../i18n";
import createSystemIdentifier from 'system-identifier-mark-uae';

const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
  const systemIdentifier = createSystemIdentifier(process.env.REACT_APP_SALT);
  const [visiterId, setVisiterId] = useState("");
const [totalCount, setTotalCount] = useState(0);
  const [chatId, setChatId] = useState("");
  useEffect(() => {
    if (!isEmpty(systemIdentifier)) {
      setVisiterId(systemIdentifier || "");
      localStorage.setItem("visiterId", systemIdentifier);
      // window.location.reload();
    }
  }, [systemIdentifier]);
   useEffect(() => {
    if (!isEmpty(localStorage.getItem("visiterId"))) {
      setVisiterId(localStorage.getItem("visiterId"));
    }
       if (!isEmpty(localStorage.getItem("chatId"))) {
      setChatId(localStorage.getItem("chatId"));
    }
  }, []);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState({
    status: false,
    message: "",
    errorType: "",
  });
  const [amountDeposit, setAmountDeposit] = useState({
    amount: "",
    check: false,
  });
  const [downloadBar, setShowDownloadBar] = useState(true);

  const [showRegForm, setShowRegForm] = useState(false);
  const [affiliate, setAffiliate] = useState("");
  const [active, setActive] = useState("sports");
  const [searchTab, setSearchTab] = useState(false);
  const [userCoins, setUserCoins] = useState({});
  let [user, setUser] = useState({});
  const [announcement, setAnnouncement] = useState(false);
  const [showWidget, setShowWidget] = useState(true);
  const [activeWidget, setActiveWidget] = useState("");
  const [scrollHeight, setScrollHeight] = useState(75);
  const [footerLink, setFooterLink] = useState({
    status: false,
    type: "",
  });
  const [showDate, setShowDate] = useState({
    status: false,
    type: "",
  });
  const [isChangeDate, setIsChangeDate] = useState(false);
  let today = new Date();
  let days = 86400000;
  let fiveDaysAgo = new Date(today - 30 * days);
  const [plDate, setPlDate] = useState([
    {
      startDate: fiveDaysAgo,
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const withoutLogin = () => {
    navigate("/login");
    setShowRegForm(true);
  };
  const [messagelist, setMessageList] = useState([]);
  const [refreshAmountLoader, setRefreshAmountLoader] = useState(false);
  const [plDateType, setPlDateType] = useState("");
  const [loginError, setLoginError] = useState("");
  const [keyTime, setKeyTime] = useState("in_play");
  const [gameTab, setGameTab] = useState("cricket");
  const [profileData, setProfileData] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPosition, setShowPosition] = useState({
    status: false,
    object: {},
  });
  const [getSendOtpStatus, setSendOtpStatus] = useState(false);

  const [checkRefresh, setCheckRefresh] = useState(false);
  const location = useLocation();
  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  let logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
    setShowSidebar(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  useEffect(() => {
    setLoader(true);
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setLoader(false);
    }, 5000);
  }, []);
  const [registerData, setRegisterData] = useState({});
  const [lang, setLang] = useState("en");
  const handleRouteChange = async () => {
    let lang = "en";
    const language_dir = localStorage.getItem("language_dir");
    if (!isEmpty(language_dir)) {
      lang = language_dir;
    }
    i18n.changeLanguage(lang);
    setLang(language_dir);
    // localStorage.setItem("language_dir", lang);
  };

  const setBr = () => {
    localStorage.setItem("language_dir", "bn");
    window.location.reload();
  };
  const setEn = () => {
    localStorage.setItem("language_dir", "en");
    window.location.reload();
  };
  useEffect(() => {
    handleRouteChange();
  }, []);

  const sendOTP = async (body, type) => {
    const { status, data } = await apiPost(apiPath.sendOTP, {
      phone_number: body?.mobile,
      country_code: body?.countryCode,
      refreralCode: body?.refreralCode || "",
      visiterId: visiterId || "",
    });
    if (status === 200) {
      if (data.success) {
        if (type == "resend") {
          toast.success("OTP resend succesfully");
        }
        if (data?.results?.alreadyRegistered == 1) {
          navigate("/pin");
          setRegisterData({
            mobile: body?.mobile,
            countryCode: body?.countryCode,
            alreadyRegistered: true,
          });
        } else {
          setRegisterData({
            mobile: body?.mobile,
            countryCode: body?.countryCode,
            otp: data?.results?.otp,
            refreralCode: body?.refreralCode,
          });
          navigate("/otp");
        }
      } else {
        setRegisterData({});
        toast.error(data?.message);
      }
    } else {
      setRegisterData({});
      toast.error(data?.message);
    }
  };

  const otpVerify = async (body) => {
    let id = Math.random() * 10000;
    const { status, data } = await apiPost(apiPath.otpVerify, {
      otp: body,
      phone_number: registerData?.mobile,
      country_code: registerData?.countryCode,
      uniqueId: id,
      visiterId: visiterId || "",
    });
    if (status === 200) {
      if (data.success) {
        setRegisterData({
          ...registerData,
          otp: body?.otp,
          id: id,
        });
        if (data?.results?.alreadyRegistered == 0) {
          navigate("/pin");
        } else {
          localStorage.setItem("token", data.results?.token);
          localStorage.setItem("refresh_token", data.results?.refresh_token);
          setUser(jwt_decode(data?.results?.token));
          navigate("/");
        }
      } else {
        toast.error(data?.message);
      }
    } else {
      toast.error(data?.message);
    }
  };
  const createPinFunc = async (body) => {
    let hostname = window.location.hostname;
    hostname = hostname.replace(/^www\./, "");
    hostname = hostname.replace(/^ag\./, "");
    const { status, data } = await apiPost(apiPath.createPin, {
      phone_number: registerData?.countryCode + registerData?.mobile,
      pin: body?.pin,
      uniqueId: registerData?.id,
      refreralCode: registerData?.refreralCode || "",
      // website:hostname || "SABAEXCH"
      visiterId: visiterId || "",
    });
    if (status === 200) {
      if (data.success) {
        // console.log(data, "data");
        localStorage.setItem("token", data.results?.token);
        localStorage.setItem("refresh_token", data.results?.refresh_token);
        setUser(jwt_decode(data?.results?.token));
        navigate("/");
        secureLocalStorage.setItem("mobile", {
          mobile: data.results?.username,
          isVerified: true,
        });
      } else {
        toast.error(data?.message);
      }
    } else {
      toast.error(data?.message);
    }
  };

  const registerForm = async (body) => {
    const { status, data } = await apiPost(apiPath.registerForm, body);
    if (status === 200) {
      if (data.success) {
      } else {
      }
    } else {
    }
  };
  // const refreshAmount = () => {
  //   const newSocket = io(
  //     `${process.env.REACT_APP_API_BASE_URL}?token=${localStorage.getItem(
  //       "token"
  //     )}&userType=front`,
  //     {
  //       transports: ["websocket"],
  //     }
  //   );
  //   const coinListener = (message) => {
  //     setUserCoins({
  //       exp: message?.results?.exposure,
  //       balance: message?.results?.totalCoins,
  //     });
  //   };
  //   const forceLogout = (message) => {
  //     const uniqueId = localStorage.getItem("uniqueId");
  //     if (uniqueId !== message.results.uniqueId) {
  //       logoutUser();
  //     }
  //   };
  //   newSocket.emit("getCoins", { user_id: user ? user.user._id : "" });
  //   newSocket.on("listenGetCoin", coinListener);
  //   newSocket.on("listenForceLogout", forceLogout);
  //   return () => newSocket.close();
  // };

  // const refreshAmount = async () => {
  //   setRefreshAmountLoader(true);
  //   const data = await apiGet(apiPath.refreshAmount);
  //   if (data?.status == 200) {
  //     if (data?.data?.success) {
  //       setUserCoins({
  //         exp: data?.data?.results?.exposure,
  //         balance: data?.data?.results?.totalCoins,
  //       });
  //       setRefreshAmountLoader(false);
  //     } else {
  //       setRefreshAmountLoader(false);
  //     }
  //   } else {
  //     setRefreshAmountLoader(false);
  //   }
  // };

  const messageList = async () => {
    const { status, data: response_users } = await apiGet(apiPath.messageList);
    if (status === 200) {
      if (response_users.success) {
        setMessageList(response_users.results);
      }
    }
  };

  useEffect(() => {
    if (showSidebar) {
      setShowSidebar(false);
    }
    if (location?.pathname?.split("/")[1] !== "full-market") {
      secureLocalStorage.removeItem("betFair");
      secureLocalStorage.removeItem("bookmaker");
      secureLocalStorage.removeItem("fancy");
      secureLocalStorage.removeItem("tie");
      setShowWidget(true);
      setActiveWidget("");
    }
    if (location?.pathname?.split("/")[1] !== "deposit") {
      setAmountDeposit({
        amount: "",
        check: false,
      });
    }
    if (location?.pathname?.split("/")[1] !== "profit-and-loss") {
      setShowDate({
        status: false,
        type: "",
      });
      setPlDate([
        {
          startDate: fiveDaysAgo,
          endDate: new Date(),
          key: "selection",
        },
      ]);
    }
  }, [location]);

  let getProfileData = async () => {
    const data = await apiGet(apiPath.userProfile);
    if (data?.status == 200) {
      if (data?.data?.success) {
        setProfileData(data?.data?.results);
        setUserCoins({
          exp: data?.data?.results?.exposure,
          balance: data?.data?.results?.totalCoins,
        });
      }
    }
  };
   const getNotificationCount = async () => {
    const { status, data: response_users } = await apiGet(
      apiPath.notificationCount
    );
    if (status === 200) {
      if (response_users.success) {
      setTotalCount(response_users?.results?.totalUnreadCount);
      }
    }
  };
  let loginUser = async (body) => {
    let hostname = window.location.hostname;
    hostname = hostname.replace(/^www\./, "");
    hostname = hostname.replace(/^ag\./, "");
    // body.website = hostname || "SABAEXCH";
    let id = Math.random() * 10000;
    const { status, data } = await apiPost(apiPath.loginUser, {
      username:
        registerData?.isVerified && !isEmpty(registerData?.username)
          ? registerData?.username
          : registerData?.countryCode + registerData?.mobile,
      password: body?.pin,
      uniqueId: id,
      website: "9wkt.win",
      visiterId: visiterId || "",
    });
    if (status === 200) {
      if (data.success) {
        localStorage.setItem("token", data.results.token);
        localStorage.setItem("refresh_token", data.results.refresh_token);
        setUser(jwt_decode(data.results.token));
        localStorage.setItem(
          "mobile",
          registerData?.countryCode + registerData?.mobile
        );
        secureLocalStorage.setItem("mobile", {
          mobile: data.results?.username,
          isVerified: true,
        });
        navigate("/");
        window.location.reload();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
        setLoginError(data.message);
      }
    } else {
      toast.error(data?.message);
    }
  };


  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
  
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const sendMobileOTP = async (type,phone_number) => {
    
    if(phone_number && type){
      const { status, data } = await apiPost(apiPath.userSendOtp, {
        phone_number: phone_number,
        visiterId: visiterId || "",
      });
      if (status === 200) {
        if (data.success) {
          if (type == "resend") {
            toast.success("OTP resend succesfully");
          }else{
            toast.success("OTP sent succesfully");
          }
          setSendOtpStatus(true)
          setMinutes(1);
          setSeconds(30);
        } else {
          
          toast.error(data?.message);
        }
      } else {
        
        toast.error(data?.message);
      }
    }else{
      toast.error("please enter correct mobile number");
    }
   
  };
  useEffect(() => {
    let data = localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token"))
      : "";
    setUser(data);
  }, []);

  useEffect(() => {
    if (!isEmpty(user) && checkRefresh) {
      amounutRefresh();
      getNotificationCount();
    }
  }, [checkRefresh]);
  useEffect(() => {
    if (!isEmpty(user)) {
      getProfileData();
      messageList();
      getNotificationCount();
    }
  }, [user]);
   useEffect(() => {
    if (!isEmpty(user)) {
      let timer = setInterval(() => {
        getProfileData();
        getNotificationCount()
      }, 60000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [user]);

  const [socketObj, setSocketObj] = useState(null);
  const amounutRefresh = () => {
    setRefreshAmountLoader(true);
    setCheckRefresh(false);
    if (!isEmpty(socketObj)) {
      socketObj.disconnect();
    }
    const newSocket = io(
      `${process.env.REACT_APP_API_BASE_URL}?token=${localStorage.getItem(
        "token"
      )}&userType=front`,
      {
        transports: ["websocket"],
      }
    );
    setTimeout(() => {
      if (!newSocket?.connected) {
        setRefreshAmountLoader(false);
        setCheckRefresh(false);
      }
    }, 2000);

    const coinListener = (message) => {
      setUserCoins({
        exp: message?.results?.exposure,
        balance: message?.results?.totalCoins,
      });
      setRefreshAmountLoader(false);
    };
    const forceLogout = (message) => {
      const uniqueId = localStorage.getItem("uniqueId");
      if (uniqueId !== message.results.uniqueId) {
        logoutUser();
      }
    };
    setSocketObj(newSocket);
    newSocket.emit("getCoins", { user_id: user ? user.user._id : "" });
    newSocket.on("listenGetCoin", coinListener);
    newSocket.on("listenForceLogout", forceLogout);
    newSocket.on("disconnect", function () {
      setRefreshAmountLoader(true);
      setCheckRefresh(true);
    });
    return () => newSocket.disconnect();
  };

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && user && !checkRefresh) {
      setCheckRefresh(true);
      if (!isEmpty(socketObj)) {
        socketObj.disconnect();
      }
    } else {
      setCheckRefresh(false);
    }
  });

  const launchEGTCasino = async (request) => {
    if (request?.platForm || request?.gameType || request?.casinoType) {
      const { status, data: response_users1 } = await apiPost(
        apiPath.easytogoCasinoAmountAdd,
        {
          prod: request?.platForm,
          type: request?.gameType,
        }
      );
      if (status === 200) {
        if (response_users1.success) {
          const { status, data: response_users } = await apiPost(
            apiPath.doLoginAndLaunchEasyToCasino,
            {
              prod: request?.platForm,
              type: request?.gameType,
              gameCode: request?.casinoType,
              gameid: request?.gameid || false,
            }
          );
          if (status === 200 && response_users.status) {
            if (response_users.data.err === 1) {
              localStorage.setItem("launchEGTCasino", request?.platForm);
              window.location.href = response_users.data.url;
            } else {
              toast.error(response_users?.data?.desc);
            }
          } else {
            toast.error(response_users?.message);
          }
        } else {
          toast.error(response_users1?.message);
        }
      }
    }
  };
  const launchCasino = async (request) => {
    if (request?.platForm || request?.gameType || request?.casinoType) {
      const { status, data: response_users1 } = await apiPost(
        apiPath.casinoAmountAdd,
        { amount: 0, platForm: request?.platForm }
      );
      if (status === 200) {
        if (response_users1.success) {
          const { status, data: response_users } = await apiPost(
            request?.platForm && request?.gameType && request?.casinoType
              ? apiPath.doLoginAndLaunchGame
              : apiPath.casinoWalletLogin,
            request?.platForm && request?.gameType && request?.casinoType
              ? {
                  userId: response_users1?.results?.aeCasinoUserId,
                  platForm: request?.platForm == "1" ? "" : request?.platForm,
                  gameType: request?.gameType,
                  gameCode: request?.casinoType,
                }
              : {
                  userId: response_users1?.results?.aeCasinoUserId,
                  gameType: request?.gameType,
                  platForm: request?.platForm == "1" ? "" : request?.platForm,
                }
          );
          if (status === 200) {
            if (response_users.status) {
              if (response_users.data.status === "0000") {
                window.location.href = response_users.data.url;
              } else {
                toast.error(response_users?.data?.desc);
              }
            }
          } else {
            toast.error(response_users?.message);
          }
        } else {
          toast.error(response_users1?.message);
        }
      } else {
        toast.error(response_users1?.message);
      }
    }
  };
  const dolaunchCasinoNew = async (request) => {
    if (request?.gameCode) {
      const { status, data: response_users1 } = await apiPost(
        apiPath.doLoginAndLaunchIQCasino,
        {
          gameid: request?.gameCode,
          legacy: request?.legacy || "",
        }
      );
      if (status === 200) {
        if (response_users1.status) {
          window.location.href = response_users1.data;
        } else {
          toast.error(
            response_users1?.message == "success"
              ? "Casino is in maintenance mode if you have any query please contact upline"
              : response_users1?.message ||
                  "Casino is in maintenance mode if you have any query please contact upline"
          );
        }
      }
    }
  };
  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    showSidebar,
    setShowSidebar,
    handleShowSidebar,
    setGameTab,
    gameTab,
    keyTime,
    setKeyTime,
    loginError,
    profileData,
    setShowPosition,
    showPosition,
    userCoins,
    setUserCoins,
    amounutRefresh,
    scrollHeight,
    setScrollHeight,
    showDate,
    setShowDate,
    plDate,
    setPlDate,
    plDateType,
    setPlDateType,
    getProfileData,
    refreshAmountLoader,
    setSearchTab,
    searchTab,
    showWidget,
    setShowWidget,
    setActiveWidget,
    activeWidget,
    messagelist: messagelist,
    announcement,
    setAnnouncement,
    launchEGTCasino,
    launchCasino,
    active,
    setActive,
    setFooterLink,
    footerLink,
    setMessage,
    message,
    registerData,
    setRegisterData,
    sendOTP,
    otpVerify,
    createPinFunc,
    setBr,
    setEn,
    lang,
    setAffiliate,
    affiliate,
    withoutLogin,
    showRegForm,
    setShowRegForm,
    isChangeDate,
    setIsChangeDate,
    amountDeposit,
    setAmountDeposit,
    dolaunchCasinoNew,
    setShowDownloadBar,
    downloadBar,
    sendMobileOTP,
    visiterId,
    chatId,
    setChatId,
    totalCount,
    getNotificationCount,
    
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
