import React, { createContext, useState, useEffect, useContext } from "react";
import { apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import AuthContext from "./AuthContext";
import { isEmpty } from "lodash";
import moment from "moment";
const BetSlipContext = createContext();

export default BetSlipContext;

export const BetSlipProvider = ({ children }) => {
  const [betLoader, setBetLoader] = useState(false);
  const { user, amounutRefresh ,setMessage,message} = useContext(AuthContext);
  const [limit, setLimit] = useState({});
  const [showBetDialog, setShowBetDialog] = useState(false);
  const [showBet, setShowBet] = useState(false);
  const [resetBetPosition, setResetBetPosition] = useState(false);
  const [betPlace, setBetPlace] = useState({
    isPlaced: false,
    message: "",
    betType: "",
  });
  const [betSlipObject, setBetSlipObject] = useState({
    odds: "",
    bidPrice: "",
    teamName: "",
    betType: "",
  });

  useEffect(() => {
    if (message?.status) {
      setTimeout(() => {
        setMessage({
          status: false,
        });
      }, 4000);
    }
  }, [message]);

  const handelError = (object, type) => {
    setShowBetDialog(false);
    setBetSlipObject({});
    setMessage({
      ...message,
      status: true,
      message: object?.message,
      errorType: "Error",
    });
    setBetPlace({
      isPlaced: true,
      betType: type,
      type: "error",
    });
  };

  const resetBetSlipObject = () => {
    setBetSlipObject({
      odds: "",
      bidPrice: "",
      teamName: "",
      betType: "",
    });
  };
  const resetBetPlace = () => {
    setBetPlace({
      isPlaced: false,
      message: "",
      betType: "",
    });
  };

  const beforeBetPlace = async (obj) => {
    setBetLoader(true);
    document.getElementById("root").style.pointerEvents = "none";
    const { data: response_users } = await apiPost(apiPath.beforeBetPlace, obj);
    return response_users;
  };

  const resetLayout = () => {
    setBetLoader(false);
    document.getElementById("root").style.pointerEvents = "auto";
  };

  const handelPlaceBetFair = async () => {
    if (!isEmpty(user) && betSlipObject?.bidPrice > 0) {
      const date = moment(new Date()).format("YYYY-MM-DD, h:mm:ss");
      let result = {
        eventId: betSlipObject?.object?.eventId,
        marketId: betSlipObject?.object?.marketId,
        betPlaceTime: date,
        betPlaceType: "betfair",
        bet: [
          {
            selectionId:
              betSlipObject?.object?.SelectionId || betSlipObject?.object?.ri,
            teamName:
              betSlipObject?.teamName || betSlipObject?.object?.runnerName,
            bhav: betSlipObject?.odds,
            amount: betSlipObject?.bidPrice,
            betType: betSlipObject?.betType,
          },
        ],
      };
      let isValid = await beforeBetPlace(result);
      if (isValid?.success) {
        setTimeout(async () => {
          const { status, data: response_users } = await apiPost(
            apiPath.betfairPlaceBet,
            result
          );
          if (status === 200) {
            if (response_users?.results?.matchedFlag) {
              setShowBetDialog(false);
              setResetBetPosition(true);
              resetLayout()
              setBetPlace({
                isPlaced: true,
                message: response_users?.message,
                betType: "betFair",
                type: "matched",
              });
              setMessage({
                ...message,
                ...betSlipObject,
                status: true,
                errorType: "Matched",
              });
              amounutRefresh();
            } else {
              resetLayout();
              handelError(response_users, "betFair");
            }
          } else {
            resetLayout();
            handelError(response_users, "betFair");
          }
        }, 2000);
      } else {
        resetLayout();
        handelError(isValid, "betFair");
      }
    }
  };

  const handelPlaceTie = async () => {
    if (!isEmpty(user) && betSlipObject?.bidPrice > 0) {
      const date = moment(new Date()).format("YYYY-MM-DD, h:mm:ss");
      let result = {
        eventId: betSlipObject?.object?.eventId,
        marketId: betSlipObject?.object?.marketId,
        betPlaceTime: date,
        betPlaceType: "tie",
        bet: [
          {
            selectionId: betSlipObject?.object?.SelectionId,
            teamName: betSlipObject?.teamName,
            bhav: betSlipObject?.odds,
            amount: betSlipObject?.bidPrice,
            betType: betSlipObject?.betType,
          },
        ],
      };
      let isValid = await beforeBetPlace(result);
      if (isValid?.success) {
        setTimeout(async () => {
          const { status, data: response_users } = await apiPost(
            apiPath.tieBetPlace,
            result
          );
          if (status === 200) {
            if (response_users?.results?.matchedFlag) {
              setShowBetDialog(false);
              setResetBetPosition(true);
              resetLayout()
              setBetPlace({
                isPlaced: true,
                message: response_users?.message,
                betType: "tie",
                type: "matched",
              });
              setMessage({
                ...message,
                ...betSlipObject,
                status: true,
                errorType: "Matched",
              });
              amounutRefresh();
            } else {
              resetLayout()
              handelError(response_users, "tie");
            }
          } else {
            resetLayout()
            handelError(response_users, "tie");
          }
        }, 2000);
      } else {
        resetLayout()
        handelError(isValid, "betFair");
      }
    }
  };

  const handelPlaceFancy = async () => {
    if (!isEmpty(user) && betSlipObject?.bidPrice > 0) {
      const date = moment(new Date()).format("YYYY-MM-DD, h:mm:ss");
      const result = {
        eventId: betSlipObject?.object?.eventId,
        marketId: betSlipObject?.object?.marketId,
        centralizedId: betSlipObject?.object?.centralizedId,
        selectionId: betSlipObject?.object?.selectionId,
        betPlaceTime: date,
        fancyName: betSlipObject?.object?.fancyName,
        bhav: betSlipObject?.object?.pt,
        amount: betSlipObject?.bidPrice,
        betType: betSlipObject?.betType,
        betRun: betSlipObject?.object?.rt,
        runnerName: betSlipObject?.object?.fancyName,
        betPlaceType: "fancy",
      };
      let isValid = await beforeBetPlace(result);
      if (isValid?.success) {
        setTimeout(async () => {
          let api = apiPath.fancyBetPlace;
          const { status, data: response_users } = await apiPost(api, result);
          if (status === 200) {
            if (response_users?.success) {
              setShowBetDialog(false);
              setResetBetPosition(true);
              resetLayout()
              setBetPlace({
                isPlaced: true,
                message: response_users?.message,
                betType: "fancy",
                type: "matched",
              });
              setMessage({
                ...message,
                ...betSlipObject,
                status: true,
                errorType: "Matched",
              });
              amounutRefresh();
            } else {
              resetLayout()
              handelError(response_users, "fancy");
            }
          } else {
            resetLayout()
            handelError(response_users, "fancy");
          }
        }, 2000);
      } else {
        resetLayout()
        handelError(isValid, "fancy");
      }
    }
  };

  const handelPlaceSportBook = async () => {
    if (!isEmpty(user) && betSlipObject?.bidPrice > 0) {
      const date = moment(new Date()).format("YYYY-MM-DD, h:mm:ss");
      const result = {
        eventId: betSlipObject?.eventId,
        marketId: betSlipObject?.marketId,
        fancySelectionId: betSlipObject?.object?.id,
        selectionId: betSlipObject?.item?.id,
        betPlaceTime: date,
        fancyName: betSlipObject?.item?.marketName,
        bhav: betSlipObject?.odds,
        amount: betSlipObject?.bidPrice,
        betType: "back",
        runnerName: betSlipObject?.object?.selectionName,
        apiSiteSelectionId: betSlipObject?.object?.apiSiteSelectionId,
        betPlaceType: "premiumFancy",
      };
      let isValid = await beforeBetPlace(result);
      if (isValid?.success) {
        setTimeout(async () => {
          let api = apiPath.preminumFancyBets;
          const { status, data: response_users } = await apiPost(api, result);
          if (status === 200) {
            if (response_users?.success) {
              setShowBetDialog(false);
              setResetBetPosition(true);
              resetLayout()
              setBetPlace({
                isPlaced: true,
                message: response_users?.message,
                betType: "sportBook",
                type: "matched",
              });
              setMessage({
                ...message,
                ...betSlipObject,
                status: true,
                betType: "back",
                errorType: "Matched",
                teamName: betSlipObject?.item?.marketName,
              });
              amounutRefresh();
            } else {
              resetLayout()
              handelError(response_users, "sportBook");
            }
          } else {
            resetLayout()
            handelError(response_users, "sportBook");
          }
        }, 2000);
      } else {
        resetLayout()
        handelError(isValid, "sportBook");
      }
    }
  };

  const handelPlaceBookmaker = async () => {
    if (!isEmpty(user) && betSlipObject?.bidPrice > 0) {
      const date = moment(new Date()).format("YYYY-MM-DD, h:mm:ss");
      let result = {
        eventId: betSlipObject?.object?.eventId,
        marketId: betSlipObject?.object?.marketId,
        selectionId: betSlipObject?.object?.SelectionId,
        betPlaceTime: date,
        teamName: betSlipObject?.teamName,
        // type: obj?.gameType,
        bhav: betSlipObject?.odds,
        amount: betSlipObject?.bidPrice,
        betType: betSlipObject?.betType,
        betPlaceType: "bookmaker",
      };
      let isValid = await beforeBetPlace(result);
      if (isValid?.success) {
        setTimeout(async () => {
          const { status, data: response_users } = await apiPost(
            apiPath.bookmakerBet,
            result
          );
          if (status === 200) {
            if (response_users?.success) {
              setShowBetDialog(false);
              setResetBetPosition(true);
              resetLayout()
              setBetPlace({
                isPlaced: true,
                message: response_users?.message,
                betType: "bookmaker",
                type: "matched",
              });
              setMessage({
                ...message,
                ...betSlipObject,
                status: true,
                errorType: "Matched",
              });
              amounutRefresh();
            } else {
              resetLayout()
              handelError(response_users, "bookmaker");
            }
          } else {
            resetLayout()
            handelError(response_users, "bookmaker");
          }
        }, 2000);
      } else {
        resetLayout()
        handelError(isValid, "bookamaker");
      }
    }
  };

  const handelPlaceToss = async () => {
    if (!isEmpty(user) && betSlipObject?.bidPrice > 0) {
      const date = moment(new Date()).format("YYYY-MM-DD, h:mm:ss");
      const result = {
        eventId: betSlipObject?.object?.eventId,
        marketId: betSlipObject?.object?.marketId,
        selectionId: betSlipObject?.object?.SelectionId,
        betPlaceTime: date,
        bhav: betSlipObject?.odds,
        amount: betSlipObject?.bidPrice,
        teamName: betSlipObject?.teamName,
      };
      let isValid = await beforeBetPlace(result);
      if (isValid?.success) {
        setTimeout(async () => {
          const { status, data: response_users } = await apiPost(
            apiPath.tossBetPlace,
            result
          );
          if (status === 200) {
            if (response_users?.success) {
              setShowBetDialog(false);
              setResetBetPosition(true);
              resetLayout()
              setBetPlace({
                isPlaced: true,
                message: response_users?.message,
                betType: "toss",
                type: "matched",
              });
              setMessage({
                ...message,
                ...betSlipObject,
                status: true,
                errorType: "Matched",
              });
              amounutRefresh();
            } else {
              resetLayout()
              handelError(response_users, "toss");
            }
          } else {
            resetLayout()
            handelError(response_users, "toss");
          }
        }, 2000);
      } else {
        resetLayout()
        handelError(isValid, "toss");
      }
    }
  };
  let contextData = {
    betLoader,
    showBetDialog,
    setShowBetDialog,
    setBetSlipObject,
    betSlipObject,
    showBet,
    setShowBet,
    resetBetSlipObject,
    resetBetPosition,
    setResetBetPosition,
    handelPlaceBetFair,
    betPlace,
    resetBetPlace,
    handelPlaceFancy,
    handelPlaceSportBook,
    handelPlaceBookmaker,
    setLimit,
    limit,
    setMessage,
    message,
    handelPlaceTie,
    handelPlaceToss,
  };
  return (
    <BetSlipContext.Provider value={contextData}>
      {children}
    </BetSlipContext.Provider>
  );
};
