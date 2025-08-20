import React, { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownButton, Form, Table } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa";
import SidebarLayout from "../../components/shared/SidebarLayout";
import SportsTab from "./SportsTab";
import { apiGet } from "../../Utils/apiFetch";
import apiPath from "../../Utils/apiPath";
import { isEmpty, startCase } from "lodash";
import obj from "../../Utils/helpers";
import objConstant from "../../Utils/constants";
import AuthContext from "../../context/AuthContext";
import { BiSolidRightArrow } from "react-icons/bi";
import NoEvent from "../../components/NoEvent";
const CurrentBets = () => {
  const { user } = useContext(AuthContext);
  const [showBet, setShowBet] = useState("");
  const [exchange, setExchange] = useState([]);
  const [fancy, setFancy] = useState([]);
  const [sportBook, setSportBook] = useState([]);
  const [parly, setParly] = useState([]);
  const [bookmaker, setBookmaker] = useState([]);
  const [tab, setTab] = useState("exchange");
  const [matched, setMatched] = useState(true);
  const handleShowBet = (data) => {
    if (data == showBet) {
      setShowBet("");
    } else {
      setShowBet(data);
    }
  };
  const getExchangeBet = async () => {
    const { status, data } = await apiGet(apiPath.getCurrentBetsExchanges);
    if (status == 200) {
      if (data?.success) {
        setExchange(data?.results);
      }
    }
  };
  const getFancyBet = async () => {
    const { status, data } = await apiGet(apiPath.getFancyBets);
    if (status == 200) {
      if (data?.success) {
        setFancy(data?.results);
      }
    }
  };
  const getBookmakerBet = async () => {
    const { status, data } = await apiGet(apiPath.getBookmakerBets);
    if (status == 200) {
      if (data?.success) {
        setBookmaker(data?.results);
      }
    }
  };
  const getSportBookBet = async () => {
    const { status, data } = await apiGet(apiPath.getSportsBook);
    if (status == 200) {
      if (data?.success) {
        setSportBook(data?.results);
      }
    }
  };
  const getParlyBet = async () => {
    const { status, data } = await apiGet(apiPath.getParlyBets);
    if (status == 200) {
      if (data?.success) {
        setParly(data?.results);
      }
    }
  };

  useEffect(() => {
    if (!isEmpty(user)) {
      getSportBookBet();
      getBookmakerBet();
      getFancyBet();
      getExchangeBet();
      getParlyBet();
    }
  }, [user]);

  let object = {
    exchange: matched ? exchange?.matched : exchange?.unMatched,
    fancy: fancy,
    sportsBook: sportBook,
    bookmaker: bookmaker,
  };

  useEffect(() => {
    setMatched(true);
  }, [tab]);

  return (
    <SidebarLayout heading={"Current Bets"}>
      <div className="pt-0 inner-sidebar-content">
        <SportsTab type="current" setTab={setTab} tab={tab} />
        <div className="select-container">
          <DropdownButton
            id="abc"
            title={`Bet Status ${!matched ? "Un-" : ""}Matched`}
            className="mb-3"
          >
            <Dropdown.Item onClick={() => setMatched(true)}>
              Matched
            </Dropdown.Item>
            {tab == "exchange" && (
              <Dropdown.Item onClick={() => setMatched(false)}>
                Un-Matched
              </Dropdown.Item>
            )}
          </DropdownButton>
        </div>
        {tab == "parly" ? (
          <div className="p-3">
            {parly?.map((res, index) => {
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
                          {!res?.isDeclared ? (
                            <td colSpan="3">
                              {" "}
                              <span
                                style={{ background: "#d4e0e5" }}
                                className={`bet-name`}
                              >
                                ---
                              </span>
                              {res?.bets?.length == 1
                                ? "SINGLE"
                                : res?.bets?.length == 2
                                ? "DOUBLE"
                                : res?.bets?.length == 3
                                ? "TREBLE"
                                : "ACCMULATOR"}
                            </td>
                          ) : (
                            <td colSpan="3">
                              {" "}
                              <span
                                style={{ background: "#d4e0e5" }}
                                className={`bet-name`}
                                // Win -- style={{ background: "green", color: "white" }}
                                // Loss -- style={{ background: "red", color: "white" }}
                              >
                                {/* Loss */}
                                {/* Win */}
                                ---
                              </span>
                              Birminghum FC
                            </td>
                          )}
                        </tr>
                        <tr>
                          <td>
                            Odds req.{" "}
                            <strong className="d-block">
                              {parseFloat(res?.bhav).toFixed(2)}
                            </strong>
                          </td>
                          <td>
                            Avg. Odds{" "}
                            <strong className="d-block">
                              {parseFloat(res?.bhav).toFixed(2)}
                            </strong>
                          </td>
                          <td>
                            Matched (PBU)
                            <strong className="d-block">{res?.amount}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Bet ID</td>
                          <td colSpan="2">{res?.matchBetId}</td>
                        </tr>
                        <tr>
                          <td>Matched Date</td>
                          <td colSpan="2">
                            {obj.dateFormat(res?.timeInserted)}
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
                                  />
                                  <span
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
                                  <td style={{ background: "#d4e0e5" }}>
                                    Win/Loss
                                    {item?.isDeclared ? (
                                      <>
                                        {item?.result == "loss" ? (
                                          <strong
                                            className="d-block"
                                            style={{ color: "red" }}
                                          >
                                            {startCase(item?.result)}
                                          </strong>
                                        ) : (
                                          <strong
                                            className="d-block"
                                            style={{ color: "green" }}
                                          >
                                            {startCase(item?.result)}
                                          </strong>
                                        )}
                                      </>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
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
            {object[tab]?.length > 0 ? (
              object[tab]?.map((item, index) => {
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
                                {item?.matchName}
                              </span>
                              <BiSolidRightArrow className="arrow-icon" />
                              <span className="master-pass">
                                {tab == "exchange"
                                  ? "Match Odds"
                                  : startCase(tab)}
                              </span>

                              {item?.runnerName && (
                                <>
                                  <BiSolidRightArrow className="arrow-icon" />
                                  <span className="master-pass">
                                    {item?.runnerName}
                                  </span>
                                </>
                              )}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="lay-back">
                            <td colSpan="3">
                              {" "}
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
                              </span>{" "}
                              {item?.teamName || item?.fancyName}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Odds req.{" "}
                              <strong className="d-block">
                                {!isEmpty(item?.betType)
                                  ? item?.bhav
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
                            <td>
                              Matched (PBU)
                              <strong className="d-block">
                                {item?.amount}
                              </strong>
                            </td>
                          </tr>
                          {!isEmpty(item?.betType) && (
                            <tr>
                              <td>Bet ID</td>
                              <td colSpan="2">{item?.matchBetId}</td>
                            </tr>
                          )}
                          <tr>
                            <td>Bet Placed</td>
                            <td colSpan="2">
                              {obj.dateFormat(item?.timeInserted)}
                            </td>
                          </tr>
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
                              <td>
                                Matched (PBU)
                                <strong className="d-block">
                                  {item?.amount}
                                </strong>
                              </td>
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

export default CurrentBets;
