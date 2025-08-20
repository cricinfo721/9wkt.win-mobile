import React, { useContext, useEffect, useState } from "react";
import SportsTab from "./CurrentBets/SportsTab";
import SidebarLayout from "../components/shared/SidebarLayout";
import { apiGet } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import objConstant from "../Utils/constants";
import { Button, Dropdown, DropdownButton, Table, Form } from "react-bootstrap";
import { isEmpty, startCase } from "lodash";
import obj from "../Utils/helpers";
import { FaAngleDown } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import { BiSolidRightArrow } from "react-icons/bi";
import { AiTwotoneCalendar } from "react-icons/ai";
import OutsideClickHandler from "react-outside-click-handler";
import moment from "moment";
import NoEvent from "../components/NoEvent";
import BetSlipContext from "../context/BetSlipContext";
import { useTranslation } from "react-i18next";
const ProfitLoss = () => {
  const { profileData, showDate, setShowDate, plDate } =
    useContext(AuthContext);
  const { setMessage, message } = useContext(BetSlipContext);
  const [tab, setTab] = useState("exchange");
  const [showBet, setShowBet] = useState("");
  const [data, setData] = useState([]);
  const [dropdown, setDropDown] = useState("All");
  const handleShowBet = (data) => {
    if (data == showBet) {
      setShowBet("");
    } else {
      setShowBet(data);
    }
  };
  const handel = (value) => {
    setTab(value);
    setFilter({
      ...filter,
      betType:
        value == "exchange"
          ? "betfair"
          : value == "sportsBook"
          ? "sportBook"
          : value == "parly"
          ? "parlay"
          : value,
    });
    getData({
      ...filter,
      betType:
        value == "exchange"
          ? "betfair"
          : value == "sportsBook"
          ? "sportBook"
          : value == "parly"
          ? "parlay"
          : value,
    });
  };
  const [total, setTotal] = useState(0);
  const [updatedData, setUpdatedData] = useState([]);
  const [filter, setFilter] = useState({
    betType: "betfair",
    status: "completed",
    fromPeriod: new Date(),
    toPeriod: new Date(),
    displayStart: moment(new Date()).format("DD/MM/YYYY"),
    displayEnd: moment(new Date()).format("DD/MM/YYYY"),
    page: 1,
    limit: 50,
  });
  const getData = async (obj = filter) => {
    const { status, data } = await apiGet(apiPath.profitLoss, {
      betType: obj?.betType,
      status: obj?.status,
      fromPeriod: obj?.fromPeriod,
      toPeriod: obj?.toPeriod,
      page: obj?.page || 1,
      limit: obj?.limit,
    });
    if (status == 200) {
      if (data?.success) {
        if (obj?.betType == "casino" || obj?.betType == "parlay") {
          setUpdatedData(data?.results?.data);
        } else {
          let check =
            data?.results?.data?.filter((res) => res?.bets_list?.length > 0)
              ?.length > 0;
          if (check) {
            setData(data?.results?.data);
            setUpdatedData(data?.results?.data);
            handelChange(dropdown, data?.results?.data, obj?.betType);
          } else {
            setData([]);
            setUpdatedData([]);
            setTotal(0);
          }
        }
      }
    }
  };

  useEffect(() => {
    setFilter({
      betType: filter?.betType,
      status: filter?.status,
      fromPeriod:
        plDate[0]?.startDate !== ""
          ? moment(plDate[0]?.startDate).format("YYYY-MM-DD")
          : "",
      toPeriod:
        plDate[0]?.endDate !== ""
          ? moment(plDate[0]?.endDate).format("YYYY-MM-DD")
          : "",
      page: 1,
      limit: 50,
      displayStart:
        plDate[0]?.startDate !== ""
          ? moment(plDate[0]?.startDate).format("DD/MM/YYYY")
          : "",
      displayEnd:
        plDate[0]?.endDate !== ""
          ? moment(plDate[0]?.endDate).format("DD/MM/YYYY")
          : "",
    });
  }, [plDate]);

  const calculateTotal = (value, newTab) => {
    let temp = value?.map((item) => {
      const resultTotalStake = item?.bets_list?.reduce((a, v) => {
        a = parseFloat(a) + parseFloat(v.amount);
        return a;
      }, 0);
      const backTotalProfitAmount = item?.bets_list?.reduce((a, v) => {
        if (v?.betType === "back" && v?.teamSelectionWin === v?.selectionId) {
          a = parseFloat(a) + parseFloat(v.profitAmount);
        }

        return a;
      }, 0);
      const backTotalLoseAmount = item?.bets_list?.reduce((a, v) => {
        if (v?.betType === "back" && v?.teamSelectionWin !== v?.selectionId) {
          a = parseFloat(a) + parseFloat(v.loseAmount);
        }
        return a;
      }, 0);

      let backSubTotalresult =
        backTotalProfitAmount > backTotalLoseAmount
          ? backTotalProfitAmount - backTotalLoseAmount
          : -(backTotalLoseAmount - backTotalProfitAmount);

      const layTotalProfitAmount = item?.bets_list?.reduce((a, v) => {
        if (v?.betType === "lay" && v?.teamSelectionWin !== v?.selectionId) {
          a = parseFloat(a) + parseFloat(v.profitAmount);
        }
        return a;
      }, 0);

      const layTotalLoseAmount = item?.bets_list?.reduce((a, v) => {
        if (v?.betType === "lay" && v?.teamSelectionWin === v?.selectionId) {
          a = parseFloat(a) + parseFloat(v.loseAmount);
        }
        return a;
      }, 0);

      let laySubTotalresult =
        layTotalProfitAmount > layTotalLoseAmount
          ? layTotalProfitAmount - layTotalLoseAmount
          : -(layTotalLoseAmount - layTotalProfitAmount);
      let marketSubTotal = backSubTotalresult + laySubTotalresult;
      const yesTotalProfitAmount = item?.bets_list?.reduce((a, v) => {
        if (v?.type == "Yes" && v?.decisionRun >= v?.betRun) {
          a = parseFloat(a) + parseFloat(v.profitAmount);
        }
        return a;
      }, 0);

      const yesTotalLoseAmount = item?.bets_list?.reduce((a, v) => {
        if (v?.type == "Yes" && v?.decisionRun < v?.betRun) {
          a = parseFloat(a) + parseFloat(v.loseAmount);
        }
        return a;
      }, 0);
      let yesSubTotalresult =
        yesTotalProfitAmount > yesTotalLoseAmount
          ? yesTotalProfitAmount - yesTotalLoseAmount
          : -(yesTotalLoseAmount - yesTotalProfitAmount);

      const noTotalProfitAmount = item?.bets_list?.reduce((a, v) => {
        if (v?.type == "No" && v?.decisionRun < v?.betRun) {
          a = parseFloat(a) + parseFloat(v.profitAmount);
        }
        return a;
      }, 0);
      const noTotalLoseAmount = item?.bets_list?.reduce((a, v) => {
        if (v?.type == "No" && v?.decisionRun >= v?.betRun) {
          a = parseFloat(a) + parseFloat(v.loseAmount);
        }
        return a;
      }, 0);
      let noSubTotalresult =
        noTotalProfitAmount > noTotalLoseAmount
          ? noTotalProfitAmount - noTotalLoseAmount
          : -(noTotalLoseAmount - noTotalProfitAmount);

      let fancyMarketSubTotal = yesSubTotalresult + noSubTotalresult;
      let fancyNetAmount = fancyMarketSubTotal;
      let v =
        marketSubTotal > 0
          ? (marketSubTotal * profileData?.commission) / 100
          : "";
      let netAmount = 0;
      let betType =
        newTab == "exchange"
          ? "betfair"
          : newTab == "sportsBook"
          ? "sportBook"
          : newTab;
      if (betType == "toss" || betType == "tie") {
        netAmount = marketSubTotal;
      } else if (betType == "fancy") {
        netAmount = fancyNetAmount;
      } else {
        netAmount = marketSubTotal - v;
      }
      return netAmount;
    });
    return temp
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      ?.toFixed();
  };
  const handelChange = (value, arrary, newTab = filter?.tab) => {
    setDropDown(value);
    if (arrary?.length > 0) {
      let totalValue;
      if (value == "All") {
        totalValue = calculateTotal(arrary, newTab);
        setUpdatedData(arrary);
      } else {
        let up = arrary?.filter((res) => {
          return res?.gameType == value;
        });
        totalValue = calculateTotal(up, newTab);
        setUpdatedData(up);
      }
      setTotal(totalValue);
    } else {
      setTotal(0);
    }
  };

  const getResult = async (obj) => {
    const { status, data } = await apiGet(apiPath.casinoGetResult, {
      userId: obj?.clientName,
      platform: obj?.platform,
      platformTxId: obj?.platformTxId,
    });
    if (status == 200) {
      if (data?.success) {
        setMessage({
          ...message,
          status: true,
          errorType: "P2P-Success",
          message: data?.message,
        });
      } else {
        setMessage({
          ...message,
          status: true,
          errorType: "P2P",
          message: data?.message,
        });
      }
    }
  };

  const { t } = useTranslation();
  return (
    <SidebarLayout heading={t("Profit_Loss_New")}>
      <div className="pt-0 inner-sidebar-content">
        <SportsTab setTab={handel} tab={tab} />
        <div className="pl-filter">
          <div className="pl-filter-first">
            <div
              onClick={() => setShowDate({ status: true, type: "Calendar" })}
              className="pl-filter-first-time"
            >
              <AiTwotoneCalendar />
              <span className="text-white truncate">
                {filter?.displayStart} - {filter?.displayEnd}
              </span>
            </div>
            <Button
              onClick={() => setShowDate({ status: true, type: "During" })}
            >
              ...
            </Button>
            <Button onClick={() => getData(filter)}>{t("Submit")}</Button>
          </div>
        </div>
        {filter?.betType !== "casino" ||
          (filter?.betType !== "parlay" && (
            <div className="select-container p-2">
              <DropdownButton
                id="abc"
                title={
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <span>{startCase(dropdown)}</span>
                    <span>
                      Total P/L{" "}
                      <span
                        className={total > 0 ? "text-success" : "text-danger"}
                      >
                        {`(${Math.abs(total)})`}
                      </span>
                    </span>
                  </div>
                }
                className="mb-1"
              >
                <Dropdown.Item
                  onClick={() => handelChange("All", data, filter?.betType)}
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handelChange("cricket", data, filter?.betType)}
                >
                  Cricket
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handelChange("tennis", data, filter?.betType)}
                >
                  Tennis
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handelChange("soccer", data, filter?.betType)}
                >
                  Soccer
                </Dropdown.Item>
              </DropdownButton>
            </div>
          ))}
        {filter?.betType == "casino" ? (
          <div className="p-3">
            {updatedData?.length > 0 ? (
              updatedData?.map((item, index) => {
                return (
                  <div className="all-bets position-relative" key={index}>
                    <div
                      className={
                        showBet
                          ? "current-bets-table mt-3 show"
                          : "current-bets-table mt-3"
                      }
                    >
                      <Table
                        bordered
                        className="rounded overflow-hidden bg-white mb-0 odds-table"
                      >
                        <thead>
                          <tr>
                            <th colSpan="3">
                              {objConstant?.betCheckObj[item?.eventType]}
                              <BiSolidRightArrow className="arrow-icon" />
                              <span className="master-pass">
                                {item?.eventName || item?.casinoName}
                              </span>
                              <BiSolidRightArrow className="arrow-icon" />
                              <span className="master-pass">
                                {tab == "exchange"
                                  ? "Match Odds"
                                  : startCase(tab)}
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              Start Time
                              <strong className="d-block">
                                {obj.dateFormat(item?.timeInserted)}
                              </strong>
                            </td>
                            <td>
                              Profit/Loss (PBU)
                              <strong
                                className={`d-block ${
                                  item?.playerPL > 0 ? "" : "text-danger"
                                }`}
                              >
                                {item?.playerPL > 0
                                  ? item?.playerPL
                                  : `(${item?.playerPL})`}
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                      {showBet == item?._id && (
                        <>
                          <div>
                            <div className="profit-loss-div">
                              <span style={{ fontWeight: "700" }}>
                                {/* {res?.sessionBetId || res?.matchBetId} */}
                              </span>
                              <span>
                                Bet Placed {obj.dateFormat(item?.timeInserted)}
                              </span>
                            </div>
                            {/* <div className="profit-loss-div-inner">
                                  <span
                                    className={`bet-name ${
                                      res?.type == "No"
                                        ? "lay"
                                        : res?.type == "Yes"
                                        ? "back"
                                        : res?.betType
                                    }`}
                                  >
                                    {startCase(res?.betType || res?.type)}{" "}
                                  </span>{" "}
                                  {res?.teamName || res?.fancyName}
                                </div> */}
                          </div>
                          <Table
                            bordered
                            className="bets-table profit-loss-div-inner-tabel mb-0"
                          >
                            <tbody>
                              <tr>
                                {/* <td>
                                      Odds{" "}
                                      <strong className="d-block">
                                        0.0
                                      </strong>
                                    </td> */}
                                <td>
                                  Stake
                                  <strong className="d-block">
                                    {item?.betAmount}
                                  </strong>
                                </td>
                                <td>
                                  Profit/Loss (PBU)
                                  <strong
                                    className={`d-block ${
                                      item?.playerPL > 0 ? "" : "text-danger"
                                    }`}
                                  >
                                    {item?.playerPL > 0
                                      ? item?.playerPL
                                      : `(${item?.playerPL})`}
                                  </strong>
                                </td>
                                <td>
                                  <Button onClick={() => getResult(item)}>
                                    Get Result
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </>
                      )}
                    </div>

                    <button
                      className={
                        showBet == item?._id
                          ? "show-hide-bet arrow-up"
                          : "show-hide-bet"
                      }
                      onClick={() => handleShowBet(item?._id)}
                    >
                      <FaAngleDown />
                    </button>
                  </div>
                );
              })
            ) : (
              <NoEvent />
            )}
          </div>
        ) : filter?.betType == "parlay" ? (
          <div className="p-3">
            {updatedData?.length > 0 ? (
              updatedData?.map((item, index) => {
                let backprofit = item?.bets
                  ?.filter((obj) => {
                    return obj?.result == "Win";
                  })
                  .reduce((a, v) => {
                    return parseFloat(a) + parseFloat(v.profitAmount);
                  }, 0);

                let backLoss = item?.bets
                  ?.filter((obj) => {
                    return obj?.result == "Loss";
                  })
                  .reduce((a, v) => {
                    return parseFloat(a) + parseFloat(v.loseAmount);
                  }, 0);
                let total = backprofit - backLoss;

                if (item?.bets?.length > 0) {
                  return (
                    <div className="all-bets position-relative" key={index}>
                      <div
                        className={
                          showBet
                            ? "current-bets-table mt-3 show"
                            : "current-bets-table mt-3"
                        }
                      >
                        <Table
                          bordered
                          className="rounded overflow-hidden bg-white mb-0 odds-table"
                        >
                          <thead>
                            <tr>
                              <th colSpan="4">
                                <span style={{ marginRight: "50px" }}></span>
                                Bet Placed
                                <BiSolidRightArrow className="arrow-icon" />
                                <span className="master-pass">
                                  {obj.dateFormat(item?.timeInserted)}
                                </span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="lay-back">
                              {!item?.isDeclared ? (
                                <td colSpan="3">
                                  {" "}
                                  <span
                                    style={{ background: "#d4e0e5" }}
                                    className={`bet-name`}
                                  >
                                    ---
                                  </span>
                                  {item?.bets?.length == 1
                                    ? "SINGLE"
                                    : item?.bets?.length == 2
                                    ? "DOUBLE"
                                    : item?.bets?.length == 3
                                    ? "TREBLE"
                                    : "ACCMULATOR"}
                                </td>
                              ) : (
                                <td colSpan="3">
                                  {" "}
                                  <span
                                    style={
                                      item?.result == "win"
                                        ? {
                                            background: "green",
                                            color: "white",
                                          }
                                        : item?.result == "loss"
                                        ? { background: "red", color: "white" }
                                        : { background: "#d4e0e5" }
                                    }
                                    className={`bet-name`}
                                  >
                                    {startCase(item?.result)}
                                  </span>
                                  {item?.bets?.length == 1
                                    ? "SINGLE"
                                    : item?.bets?.length == 2
                                    ? "DOUBLE"
                                    : item?.bets?.length == 3
                                    ? "TREBLE"
                                    : "ACCMULATOR"}
                                </td>
                              )}
                            </tr>
                            <tr>
                              <td>
                                Start Time
                                <strong className="d-block">
                                  {obj.dateFormat(item?.timeInserted)}
                                </strong>
                              </td>
                              <td>
                                Settled Date
                                <strong className="d-block">
                                  {obj.dateFormat(item?.timeInserted)}
                                </strong>
                              </td>
                              <td>
                                Profit/Loss (PBU)
                                {item?.result == "win" ? (
                                  <strong
                                    className="d-block"
                                    style={{ color: "green" }}
                                  >
                                    {item?.profitAmount}
                                  </strong>
                                ) : (
                                  <strong
                                    className="d-block"
                                    style={{ color: "red" }}
                                  >
                                    {item?.loseAmount}
                                  </strong>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Total Stake</td>
                              <td colSpan="2">{item?.amount}</td>
                            </tr>
                          </tbody>
                        </Table>
                        {showBet == item?._id &&
                          item?.bets?.length > 0 &&
                          item?.bets?.map((res) => {
                            return (
                              <>
                                <Table className="bets-table  mb-0">
                                  <thead>
                                    <th colSpan="4">
                                      {objConstant?.betCheckObj[res?.eventType]}
                                      <BiSolidRightArrow
                                        style={{
                                          background: "#9cb1bd",
                                          padding: "0",
                                          boxShadow: "none",
                                        }}
                                        className="arrow-icon"
                                      />
                                      <span
                                        style={{ background: "#9cb1bd" }}
                                        className=""
                                      >
                                        {res?.matchName}
                                      </span>

                                      <BiSolidRightArrow
                                        style={{
                                          background: "#9cb1bd",
                                          padding: "0",
                                          boxShadow: "none",
                                        }}
                                        className="arrow-icon"
                                      />
                                      <span
                                        style={{ background: "#9cb1bd" }}
                                        className=""
                                      >
                                        {res?.runnerName}
                                      </span>
                                    </th>
                                  </thead>
                                  <tbody style={{ background: "#d4e0e5" }}>
                                    <tr>
                                      {" "}
                                      <td
                                        style={{
                                          background: "#d4e0e5",
                                          borderBottom: "1px solid #9cb1bd",
                                        }}
                                        colSpan="3"
                                      >
                                        {res?.fancyName}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          background: "#d4e0e5",
                                          borderRight: "1px solid #9cb1bd",
                                        }}
                                      >
                                        Odds Matched{" "}
                                        <strong className="d-block">
                                          {res?.bhav}
                                        </strong>
                                      </td>
                                      <td
                                        style={{
                                          background: "#d4e0e5",
                                          borderRight: "1px solid #9cb1bd",
                                        }}
                                      >
                                        Win/Loss{" "}
                                        {res?.result == "loss" ? (
                                          <strong
                                            className="d-block"
                                            style={{ color: "red" }}
                                          >
                                            {startCase(res?.result)}
                                          </strong>
                                        ) : (
                                          <strong
                                            className="d-block"
                                            style={{ color: "green" }}
                                          >
                                            {startCase(res?.result)}
                                          </strong>
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </>
                            );
                          })}
                        {showBet == item?._id && (
                          <div className="profit-loss-footer">
                            {/* <div className="profit-loss-footer-inner">
                              <div className="">
                                <span className="text">Back subtotal</span>
                                {total > 0 ? (
                                  <span className="text-success">
                                    {Math.abs(obj.truncateDecimals(total, 2))}
                                  </span>
                                ) : (
                                  <span className="text-danger">
                                    ({Math.abs(obj.truncateDecimals(total, 2))})
                                  </span>
                                )}
                              </div>
                              <div className="pl-2 grid grid-cols-3 leading-relaxed">
                                <span className="text">Lay subtotal</span>
                                <span className="">(0.0)</span>
                              </div>
                              <div className="">
                                <span className="text">Market subtotal</span>
                                {total > 0 ? (
                                  <span className="text-success">
                                    {Math.abs(obj.truncateDecimals(total, 2))}
                                  </span>
                                ) : (
                                  <span className="text-danger">
                                    ({Math.abs(obj.truncateDecimals(total, 2))})
                                  </span>
                                )}
                              </div>

                              <div className="pl-2 grid grid-cols-3 leading-relaxed">
                                <span className="text">Commission</span>
                                <span className="">(0.0)</span>
                              </div>
                            </div> */}
                            <div className="profit-loss-footer-inner-footer">
                              <span className="text">Net Market Total</span>
                              {item?.result == "win" ? (
                                <span className="text-success">
                                  {Math.abs(
                                    obj.truncateDecimals(item?.profitAmount, 2)
                                  )}
                                </span>
                              ) : (
                                <span className="text-danger">
                                  (
                                  {Math.abs(
                                    obj.truncateDecimals(item?.loseAmount, 2)
                                  )}
                                  )
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        className={
                          showBet == item?._id
                            ? "show-hide-bet arrow-up"
                            : "show-hide-bet"
                        }
                        onClick={() => handleShowBet(item?._id)}
                      >
                        <FaAngleDown />
                      </button>
                    </div>
                  );
                }
              })
            ) : (
              <NoEvent />
            )}
          </div>
        ) : (
          <div className="p-3">
            {updatedData?.length > 0 ? (
              updatedData?.map((item, index) => {
                const resultTotalStake = item?.bets_list?.reduce((a, v) => {
                  a = parseFloat(a) + parseFloat(v.amount);
                  return a;
                }, 0);
                const backTotalProfitAmount = item?.bets_list?.reduce(
                  (a, v) => {
                    if (
                      v?.betType === "back" &&
                      v?.teamSelectionWin === v?.selectionId
                    ) {
                      a = parseFloat(a) + parseFloat(v.profitAmount);
                    }

                    return a;
                  },
                  0
                );
                const backTotalLoseAmount = item?.bets_list?.reduce((a, v) => {
                  if (
                    v?.betType === "back" &&
                    v?.teamSelectionWin !== v?.selectionId
                  ) {
                    a = parseFloat(a) + parseFloat(v.loseAmount);
                  }
                  return a;
                }, 0);

                let backSubTotalresult =
                  backTotalProfitAmount > backTotalLoseAmount
                    ? backTotalProfitAmount - backTotalLoseAmount
                    : -(backTotalLoseAmount - backTotalProfitAmount);

                const layTotalProfitAmount = item?.bets_list?.reduce((a, v) => {
                  if (
                    v?.betType === "lay" &&
                    v?.teamSelectionWin !== v?.selectionId
                  ) {
                    a = parseFloat(a) + parseFloat(v.profitAmount);
                  }
                  return a;
                }, 0);

                const layTotalLoseAmount = item?.bets_list?.reduce((a, v) => {
                  if (
                    v?.betType === "lay" &&
                    v?.teamSelectionWin === v?.selectionId
                  ) {
                    a = parseFloat(a) + parseFloat(v.loseAmount);
                  }
                  return a;
                }, 0);

                let laySubTotalresult =
                  layTotalProfitAmount > layTotalLoseAmount
                    ? layTotalProfitAmount - layTotalLoseAmount
                    : -(layTotalLoseAmount - layTotalProfitAmount);
                let marketSubTotal = backSubTotalresult + laySubTotalresult;
                const yesTotalProfitAmount = item?.bets_list?.reduce((a, v) => {
                  if (v?.type == "Yes" && v?.decisionRun >= v?.betRun) {
                    a = parseFloat(a) + parseFloat(v.profitAmount);
                  }
                  return a;
                }, 0);

                const yesTotalLoseAmount = item?.bets_list?.reduce((a, v) => {
                  if (v?.type == "Yes" && v?.decisionRun < v?.betRun) {
                    a = parseFloat(a) + parseFloat(v.loseAmount);
                  }
                  return a;
                }, 0);
                let yesSubTotalresult =
                  yesTotalProfitAmount > yesTotalLoseAmount
                    ? yesTotalProfitAmount - yesTotalLoseAmount
                    : -(yesTotalLoseAmount - yesTotalProfitAmount);

                const noTotalProfitAmount = item?.bets_list?.reduce((a, v) => {
                  if (v?.type == "No" && v?.decisionRun < v?.betRun) {
                    a = parseFloat(a) + parseFloat(v.profitAmount);
                  }
                  return a;
                }, 0);
                const noTotalLoseAmount = item?.bets_list?.reduce((a, v) => {
                  if (v?.type == "No" && v?.decisionRun >= v?.betRun) {
                    a = parseFloat(a) + parseFloat(v.loseAmount);
                  }
                  return a;
                }, 0);
                let noSubTotalresult =
                  noTotalProfitAmount > noTotalLoseAmount
                    ? noTotalProfitAmount - noTotalLoseAmount
                    : -(noTotalLoseAmount - noTotalProfitAmount);

                let fancyMarketSubTotal = yesSubTotalresult + noSubTotalresult;
                let fancyNetAmount = fancyMarketSubTotal;
                let v =
                  marketSubTotal > 0
                    ? (marketSubTotal * profileData?.commission) / 100
                    : "";
                let netAmount = 0;
                let betType =
                  tab == "exchange"
                    ? "betfair"
                    : tab == "sportsBook"
                    ? "sportBook"
                    : tab;
                if (betType == "toss" || betType == "tie") {
                  netAmount = marketSubTotal;
                } else {
                  netAmount = marketSubTotal - v;
                }
                if (item?.bets_list?.length > 0) {
                  return (
                    <div className="all-bets position-relative" key={index}>
                      <div
                        className={
                          showBet
                            ? "current-bets-table mt-3 show"
                            : "current-bets-table mt-3"
                        }
                      >
                        <Table
                          bordered
                          className="rounded overflow-hidden bg-white mb-0 odds-table"
                        >
                          <thead>
                            <tr>
                              <th className="table-header" colSpan="3">
                                {objConstant?.betCheckObj[item?.eventType]}
                                <BiSolidRightArrow className="arrow-icon" />
                                <span className="master-pass">
                                  {item?.eventName}
                                </span>
                                <BiSolidRightArrow className="arrow-icon" />
                                <span className="master-pass">
                                  {tab == "exchange"
                                    ? "Match Odds"
                                    : startCase(tab)}
                                </span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                Start Time
                                <strong className="d-block">
                                  {obj.dateFormat(item?.eventDateTime)}
                                </strong>
                              </td>
                              <td>
                                Profit/Loss (PBU)
                                {betType == "fancy" ? (
                                  fancyNetAmount > 0 ? (
                                    <strong className="d-block text-success">
                                      {Math.abs(fancyNetAmount)}
                                    </strong>
                                  ) : (
                                    <strong className="d-block text-danger">
                                      ({Math.abs(fancyNetAmount)})
                                    </strong>
                                  )
                                ) : netAmount > 0 ? (
                                  <strong className="d-block text-success">
                                    {obj.truncateDecimals(netAmount, 2)}
                                  </strong>
                                ) : (
                                  <strong className="d-block text-danger">
                                    (
                                    {Math.abs(
                                      obj.truncateDecimals(netAmount, 2)
                                    )}
                                    )
                                  </strong>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        {showBet == item?._id &&
                          item?.bets_list?.length > 0 &&
                          item?.bets_list?.map((res) => {
                            return (
                              <>
                                <div>
                                  <div className="profit-loss-div">
                                    <span style={{ fontWeight: "700" }}>
                                      {res?.sessionBetId || res?.matchBetId}
                                    </span>
                                    <span>
                                      Bet Placed{" "}
                                      {obj.dateFormat(res?.createdAt)}
                                    </span>
                                  </div>
                                  <div className="profit-loss-div-inner">
                                    <span
                                      className={`bet-name ${
                                        res?.type == "No"
                                          ? "lay"
                                          : res?.type == "Yes"
                                          ? "back"
                                          : res?.betType
                                      }`}
                                    >
                                      {startCase(res?.betType || res?.type)}{" "}
                                    </span>{" "}
                                    {res?.teamName || res?.fancyName}
                                  </div>
                                </div>
                                <Table
                                  bordered
                                  className="bets-table profit-loss-div-inner-tabel mb-0"
                                >
                                  <tbody>
                                    <tr>
                                      <td style={{ fontSize: "13px" }}>
                                        Odds{" "}
                                        <strong className="d-block">
                                          {!isEmpty(res?.betType)
                                            ? res?.bhav
                                            : `${res?.betRun}/${res?.bhav}`}
                                        </strong>
                                      </td>
                                      <td style={{ fontSize: "13px" }}>
                                        Stake
                                        <strong className="d-block">
                                          {res?.amount}
                                        </strong>
                                      </td>
                                      <td style={{ fontSize: "13px" }}>
                                        Profit/Loss (PBU)
                                        {betType == "fancy" ? (
                                          <strong className="d-block">
                                            {res?.type == "No" ? (
                                              res?.decisionRun < res?.betRun ? (
                                                <span className="text-success">
                                                  {obj.truncateDecimals(
                                                    res?.profitAmount,
                                                    2
                                                  )}
                                                </span>
                                              ) : (
                                                <span className="text-danger">
                                                  (
                                                  {obj.truncateDecimals(
                                                    res?.loseAmount,
                                                    2
                                                  )}
                                                  )
                                                </span>
                                              )
                                            ) : res?.decisionRun >=
                                              res?.betRun ? (
                                              <span className="text-success">
                                                {obj.truncateDecimals(
                                                  res?.profitAmount,
                                                  2
                                                )}
                                              </span>
                                            ) : (
                                              <span className="text-danger">
                                                (
                                                {obj.truncateDecimals(
                                                  res?.loseAmount,
                                                  2
                                                )}
                                                )
                                              </span>
                                            )}
                                          </strong>
                                        ) : (
                                          <strong className="d-block">
                                            {(res?.teamSelectionWin ==
                                              res?.selectionId &&
                                              res?.betType == "back") ||
                                            (res?.teamSelectionWin !=
                                              res?.selectionId &&
                                              res?.betType == "lay") ? (
                                              <td
                                                id="txLiability"
                                                className="text-success"
                                              >
                                                {obj.truncateDecimals(
                                                  res?.profitAmount,
                                                  2
                                                )}
                                              </td>
                                            ) : (
                                              <td id="txLiability">
                                                <span className="text-danger">
                                                  (
                                                  {obj.truncateDecimals(
                                                    res?.loseAmount,
                                                    2
                                                  )}
                                                  )
                                                </span>
                                              </td>
                                            )}
                                          </strong>
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </>
                            );
                          })}
                        {showBet == item?._id && (
                          <div className="profit-loss-footer">
                            <div className="profit-loss-footer-inner">
                              {betType == "fancy" ? (
                                <>
                                  {" "}
                                  <div className="">
                                    <span className="text">Yes subtotal</span>
                                    {yesSubTotalresult ? (
                                      yesTotalProfitAmount >
                                      yesTotalLoseAmount ? (
                                        <span className="text-success">
                                          {Math.abs(
                                            obj.truncateDecimals(
                                              yesSubTotalresult,
                                              2
                                            )
                                          )}
                                        </span>
                                      ) : (
                                        <span className="text-danger">
                                          (
                                          {Math.abs(
                                            obj.truncateDecimals(
                                              yesSubTotalresult,
                                              2
                                            )
                                          )}
                                          )
                                        </span>
                                      )
                                    ) : (
                                      Math.abs(
                                        obj.truncateDecimals(
                                          yesSubTotalresult,
                                          2
                                        )
                                      )
                                    )}
                                  </div>
                                  <div className="pl-2 grid grid-cols-3 leading-relaxed">
                                    <span className="text">No subtotal</span>
                                    {noSubTotalresult ? (
                                      noTotalProfitAmount >
                                      noTotalLoseAmount ? (
                                        <span className="text-success">
                                          {Math.abs(
                                            obj.truncateDecimals(
                                              noSubTotalresult,
                                              2
                                            )
                                          )}
                                        </span>
                                      ) : (
                                        <span className="text-danger">
                                          (
                                          {Math.abs(
                                            obj.truncateDecimals(
                                              noSubTotalresult,
                                              2
                                            )
                                          )}
                                          )
                                        </span>
                                      )
                                    ) : (
                                      Math.abs(
                                        obj.truncateDecimals(
                                          noSubTotalresult,
                                          2
                                        )
                                      )
                                    )}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="">
                                    <span className="text">Back subtotal</span>
                                    {backSubTotalresult ? (
                                      backTotalProfitAmount >
                                      backTotalLoseAmount ? (
                                        <span className="text-success">
                                          {Math.abs(
                                            obj.truncateDecimals(
                                              backSubTotalresult,
                                              2
                                            )
                                          )}
                                        </span>
                                      ) : (
                                        <span className="text-danger">
                                          (
                                          {Math.abs(
                                            obj.truncateDecimals(
                                              backSubTotalresult,
                                              2
                                            )
                                          )}
                                          )
                                        </span>
                                      )
                                    ) : (
                                      Math.abs(
                                        obj.truncateDecimals(
                                          backSubTotalresult,
                                          2
                                        )
                                      )
                                    )}
                                  </div>
                                  <div className="pl-2 grid grid-cols-3 leading-relaxed">
                                    <span className="text">Lay subtotal</span>
                                    {layTotalProfitAmount >
                                    layTotalLoseAmount ? (
                                      <span className="text-success">
                                        {Math.abs(
                                          obj.truncateDecimals(
                                            laySubTotalresult,
                                            2
                                          )
                                        )}
                                      </span>
                                    ) : (
                                      <span className="text-danger">
                                        (
                                        {Math.abs(
                                          obj.truncateDecimals(
                                            laySubTotalresult,
                                            2
                                          )
                                        )}
                                        )
                                      </span>
                                    )}
                                  </div>
                                </>
                              )}
                              {betType == "fancy" ? (
                                <div className="">
                                  <span className="text">Market subtotal</span>
                                  {yesTotalProfitAmount > yesTotalLoseAmount ||
                                  noTotalProfitAmount > noTotalLoseAmount ? (
                                    <span className="text-success">
                                      {Math.abs(
                                        obj.truncateDecimals(
                                          fancyMarketSubTotal,
                                          2
                                        )
                                      )}
                                    </span>
                                  ) : (
                                    <span className="text-danger">
                                      (
                                      {Math.abs(
                                        obj.truncateDecimals(
                                          fancyMarketSubTotal,
                                          2
                                        )
                                      )}
                                      )
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <div className="">
                                  <span className="text">Market subtotal</span>
                                  {backTotalProfitAmount >
                                    backTotalLoseAmount ||
                                  layTotalProfitAmount > layTotalLoseAmount ? (
                                    <span className="text-success">
                                      {Math.abs(
                                        obj.truncateDecimals(marketSubTotal, 2)
                                      )}
                                    </span>
                                  ) : (
                                    <span className="text-danger">
                                      (
                                      {Math.abs(
                                        obj.truncateDecimals(marketSubTotal, 2)
                                      )}
                                      )
                                    </span>
                                  )}
                                </div>
                              )}
                              {betType != "fancy" &&
                                betType != "tie" &&
                                marketSubTotal > 0 && (
                                  <div className="pl-2 grid grid-cols-3 leading-relaxed">
                                    <span className="text">Commission</span>
                                    <span className="">
                                      {Math.abs(
                                        (marketSubTotal *
                                          profileData.commission) /
                                          100
                                      )}
                                    </span>
                                  </div>
                                )}
                            </div>
                            {betType == "fancy" ? (
                              <div className="profit-loss-footer-inner-footer">
                                <span className="text">Net Market Total</span>
                                {fancyNetAmount > 0 ? (
                                  <span className="text-success">
                                    {obj.truncateDecimals(fancyNetAmount, 2)}
                                  </span>
                                ) : (
                                  <span className="text-danger">
                                    (
                                    {Math.abs(
                                      obj.truncateDecimals(fancyNetAmount, 2)
                                    )}
                                    )
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div className="profit-loss-footer-inner-footer">
                                <span className="text">Net Market Total</span>
                                {netAmount > 0 ? (
                                  <span className="text-success">
                                    {obj.truncateDecimals(netAmount, 2)}
                                  </span>
                                ) : (
                                  <span className="text-danger">
                                    (
                                    {Math.abs(
                                      obj.truncateDecimals(netAmount, 2)
                                    )}
                                    )
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        className={
                          showBet == item?._id
                            ? "show-hide-bet arrow-up"
                            : "show-hide-bet"
                        }
                        onClick={() => handleShowBet(item?._id)}
                      >
                        <FaAngleDown />
                      </button>
                    </div>
                  );
                }
              })
            ) : (
              <NoEvent />
            )}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default ProfitLoss;
