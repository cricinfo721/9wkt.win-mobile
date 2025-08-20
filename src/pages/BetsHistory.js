import React, { useContext, useEffect, useState } from "react";
import SportsTab from "./CurrentBets/SportsTab";
import SidebarLayout from "../components/shared/SidebarLayout";
import { apiGet } from "../Utils/apiFetch";
import { FaAngleDown } from "react-icons/fa";
import { Button, Dropdown, DropdownButton, Form, Table } from "react-bootstrap";
import apiPath from "../Utils/apiPath";
import objConstant from "../Utils/constants";
import { isEmpty, startCase } from "lodash";
import obj from "../Utils/helpers";
import { BiSolidRightArrow } from "react-icons/bi";
import NoEvent from "../components/NoEvent";
import BetSlipContext from "../context/BetSlipContext";
import { AiTwotoneCalendar } from "react-icons/ai";
import moment from "moment";
import AuthContext from "../context/AuthContext";
const BetsHistory = () => {
  const [tab, setTab] = useState("exchange");
  const [data, setData] = useState([]);
  const { setMessage, message } = useContext(BetSlipContext);
  const { setShowDate, plDate } = useContext(AuthContext);
  const [showBet, setShowBet] = useState("");
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
    // getData({
    //   ...filter,
    //   betType:
    //     value == "exchange"
    //       ? "betfair"
    //       : value == "sportsBook"
    //       ? "sportBook"
    //       : value,
    // });
  };
  const getData = async (obj = filter) => {
    const { status, data } = await apiGet(apiPath.getHistory, {
      betType: obj?.betType,
      status: obj?.status,
      fromPeriod: obj?.fromPeriod,
      toPeriod: obj?.toPeriod,
      page: obj?.page || 1,
      limit: obj?.limit,
    });
    if (status == 200) {
      if (data?.success) {
        setData(data?.results);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
          errorType: "Error",
          message: data?.message,
        });
      }
    }
  };
  return (
    <SidebarLayout heading={"Bets History"}>
      <div className="pt-0 inner-sidebar-content">
        <SportsTab setTab={handel} tab={tab} />
        <div className="pl-filter">
          <div className="select-container bet-history-dropdown">
            <DropdownButton
              id="dropdown-basic-button"
              title={`Bet Status ${
                filter?.status == "completed"
                  ? "Completed"
                  : startCase(filter?.status)
              }`}
            >
              <Dropdown.Item
                onClick={() => {
                  setFilter({ ...filter, status: "completed" });
                  getData({ ...filter, status: "completed" });
                }}
              >
                Completed
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setFilter({ ...filter, status: "cancelled" });
                  getData({ ...filter, status: "cancelled" });
                }}
              >
                Cancelled
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setFilter({ ...filter, status: "voided" });
                  getData({ ...filter, status: "voided" });
                }}
              >
                Voided
              </Dropdown.Item>
            </DropdownButton>
            <div className="pl-filter-first p-0 mt-2">
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
              <Button onClick={() => getData(filter)}>Submit</Button>
            </div>
          </div>
        </div>

        
        {tab == "parly" ? (
          <div className="p-3">
            {data?.map((res, index) => {
              return (
                <div className="all-bets position-relative" key={res?._id}>
                  <div
                    style={{ borderBottom: "8px solid #9cb1bd" }}
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
                              {obj.dateFormat(res?.timeInserted)}
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="lay-back">
                        
                        <td colSpan="3">
                              {" "}
                              <span
                                style={
                                  res?.result == "win"
                                    ? { background: "green", color: "white" }
                                    : res?.result == "loss"
                                    ? { background: "red", color: "white" }
                                    : { background: "#d4e0e5" }
                                }
                                className={`bet-name`}
                                // Win -- style={{ background: "green", color: "white" }}
                                // Loss -- style={{ background: "red", color: "white" }}
                              >
                                {startCase(res?.result)}
                              </span>
                              {res?.bets?.length == 1
                                ? "SINGLE"
                                : res?.bets?.length == 2
                                ? "DOUBLE"
                                : res?.bets?.length == 3
                                ? "TREBLE"
                                : "ACCMULATOR"}
                            </td>
                        </tr>
                        <tr>
                          <td>
                            Odds req.{" "}
                            <strong className="d-block">{parseFloat(res?.bhav).toFixed(2)}</strong>
                          </td>
                          <td>
                            Avg. Odds{" "}
                            <strong className="d-block">{parseFloat(res?.bhav).toFixed(2)}</strong>
                          </td>
                          <td>
                            Stake (PBU)
                            <strong className="d-block">{res?.amount}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Bet ID</td>
                          <td colSpan="2">{res?.matchBetId}</td>
                        </tr>
                        <tr>
                          <td>Profit/Loss (PBU)</td>
                          <td colSpan="2">
                             {res?.result == "win"
                                    ? <strong className="d-block" style={{ color: "green"}}>{res?.profitAmount}</strong>
                                    : <strong className="d-block"  style={{ color: "red"}}>{res?.loseAmount}</strong>
                                  }
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    {showBet == res?._id && (
                      <>
                        {res?.bets?.map((item) => {
                          return (
                            <Table className="bets-table  mb-0">
                              <thead>
                                <th colSpan="4">
                                  {objConstant?.betCheckObj[item?.eventType]}
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
                                    {item?.matchName}
                                  </span>
                                  <BiSolidRightArrow
                                    style={{
                                      background: "#9cb1bd",
                                      padding: "0",
                                      boxShadow: "none",
                                    }}
                                    className="arrow-icon"
                                  /><span
                                  style={{ background: "#9cb1bd" }}
                                  className=""
                                >
                                  {item?.fancyName}
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
                                    {item?.runnerName}
                                  </span>
                                </th>
                              </thead>
                              <tbody style={{ background: "#d4e0e5" }}>
                                <tr>
                                  <td
                                    style={{
                                      background: "#d4e0e5",
                                      borderRight: "1px solid #9cb1bd",
                                    }}
                                  >
                                    Odds req.{" "}
                                    <strong className="d-block">
                                    {parseFloat(item?.bhav).toFixed(2)}
                                    </strong>
                                  </td>
                                  <td
                                    style={{
                                      background: "#d4e0e5",
                                      borderRight: "1px solid #9cb1bd",
                                    }}
                                  >
                                    Avg. Odds{" "}
                                    <strong className="d-block">
                                      {parseFloat(item?.bhav).toFixed(2)}
                                    </strong>
                                  </td>
                                  {/* <td style={{ background: "#d4e0e5" }}>
                                    Win/Loss
                                    <strong className="d-block">{item?.result == 'win' ? item?.profitAmount : item?.loseAmount}</strong>
                                  </td> */}
                                </tr>
                              </tbody>
                            </Table>
                          );
                        })}
                      </>
                    )}
                  </div>

                  <button
                    className={
                      showBet == res?._id
                        ? "show-hide-bet arrow-up"
                        : "show-hide-bet"
                    }
                    onClick={() => handleShowBet(res?._id)}
                  >
                    <FaAngleDown />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-3">
            {data?.length > 0 ? (
              data?.map((item, index) => {
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
                              {objConstant?.betCheckObj[item?.eventType]}
                              <BiSolidRightArrow className="arrow-icon" />
                              <span className="master-pass">
                                {item?.matchName || item?.casinoName}
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
                          <tr className="lay-back">
                            <td colSpan="3">
                              {" "}
                              {filter?.betType == "casino" ? (
                                <span>Bet Id -</span>
                              ) : (
                                <span
                                  className={`bet-name ${
                                    item?.type == "No"
                                      ? "lay"
                                      : item?.type == "Yes"
                                      ? "back"
                                      : item?.betType
                                  }`}
                                >
                                  {startCase(item?.betType || item?.type)}{" "}
                                </span>
                              )}
                              {filter?.betType == "casino"
                                ? item?.platformTxId
                                : item?.teamName || item?.fancyName}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Odds req.{" "}
                              {filter?.betType !== "casino" ? (
                                <strong className="d-block">
                                  {!isEmpty(item?.betType)
                                    ? parseFloat(item?.bhav).toFixed(2)
                                    : `${item?.betRun}/${item?.bhav}`}
                                </strong>
                              ) : (
                                <strong className="d-block">0.0</strong>
                              )}
                            </td>
                            <td>
                              Avg. Odds{" "}
                              {filter?.betType !== "casino" ? (
                                <strong className="d-block">
                                  {!isEmpty(item?.betType)
                                    ? parseFloat(item?.bhav).toFixed(2)
                                    : `${item?.betRun}/${item?.bhav}`}
                                </strong>
                              ) : (
                                <strong className="d-block">0.0</strong>
                              )}
                            </td>
                            <td>
                              {filter?.betType == "casino"
                                ? "Stake"
                                : "Matched (PBU)"}
                              <strong className="d-block">
                                {item?.amount || item?.betAmount}
                              </strong>
                            </td>
                          </tr>
                          {!isEmpty(item?.betType) && (
                            <tr>
                              <td>Bet ID</td>
                              <td colSpan="2">{item?.matchBetId}</td>
                            </tr>
                          )}
                          {filter?.betType !== "casino" && (
                            <tr>
                              <td>Bet Placed</td>
                              <td colSpan="2">
                                {obj.dateFormat(item?.timeInserted)}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>

                      {showBet == item?._id && (
                        <Table className="bets-table mb-0">
                          <thead>
                            <th className="pe-0">Bet Taken</th>
                            <th colSpan="2">
                              {obj.dateFormat(item?.timeInserted)}
                            </th>
                          </thead>
                          <tbody>
                            <tr>
                              {filter?.betType !== "casino" && (
                                <>
                                  <td>
                                    Odds req.{" "}
                                    <strong className="d-block">
                                      {!isEmpty(item?.betType)
                                        ? parseFloat(item?.bhav).toFixed(2)
                                        : `${item?.betRun}/${item?.bhav}`}
                                    </strong>
                                  </td>
                                  <td>
                                    Avg. Odds{" "}
                                    <strong className="d-block">
                                      {!isEmpty(item?.betType)
                                        ? parseFloat(item?.bhav).toFixed(2)
                                        : `${item?.betRun}/${item?.bhav}`}
                                    </strong>
                                  </td>
                                </>
                              )}
                              <td>
                                {filter?.betType == "casino"
                                  ? "Stake"
                                  : "Matched (PBU)"}
                                <strong className="d-block">
                                  {item?.amount || item?.betAmount}
                                </strong>
                              </td>
                              {filter?.betType == "casino" && (
                                <>
                                  <td>
                                    Profit / Loss
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
                                </>
                              )}
                            </tr>
                            {(item?.betType == "lay" || item?.type == "No") && (
                              <tr>
                                <td>Liability (PBU)</td>
                                <td colSpan="2" className="text-danger">
                                  ({item?.loseAmount})
                                </td>
                              </tr>
                            )}
                            {(item?.betType == "back" ||
                              item?.type == "Yes") && (
                              <tr>
                                <td>Profit (PBU)</td>
                                <td colSpan="2" className="text-success">
                                  {item?.profitAmount}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
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
        )}
      </div>
    </SidebarLayout>
  );
};

export default BetsHistory;
