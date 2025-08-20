import React, { useContext, useEffect } from "react";
import BetSlipContext from "../context/BetSlipContext";
import { RxCross2 } from "react-icons/rx";
import OutsideClickHandler from "react-outside-click-handler";
import { Button } from "react-bootstrap";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Message = () => {
  const { setMessage, message } = useContext(BetSlipContext);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setMessage({ ...message, status: false });
      }}
    >
      <div
        className={`message ${
          message?.errorType == "Error" ||
          message?.errorType == "unMatched" ||
          message?.errorType == "P2P"
            ? "error"
            : "success"
        }`}
      >
        <div className="market-title">
          <h4>
            {message?.errorType == "Error" ||
            message?.errorType == "unMatched" ||
            message?.errorType == "P2P" ? (
              <BiErrorCircle size={25} />
            ) : (
              <AiOutlineCheckCircle size={25} />
            )}{" "}
            {message?.errorType == "P2P"
              ? "Error"
              : message?.errorType == "P2P-Success"
              ? "Success"
              : `Bet ${message?.errorType}`}
          </h4>
          <Button
            onClick={() => setMessage({ ...message, status: false })}
            className="border-0 abc text-white position-absolute end-0 top-0 pt-1 fs-4 bg-transparent border-0"
          >
            <RxCross2 />
          </Button>
        </div>
        <div className="messageBox">
          {message?.errorType == "Error" ||
          message?.errorType == "unMatched" ||
          message?.errorType == "P2P" ||
          message?.errorType == "P2P-Success" ? (
            <div className="inner-messageBox">
              <p>{message?.message}</p>
            </div>
          ) : (
            <div className="inner-messageBox placed-bet">
              <span
                className={
                  message?.betType == "No" || message?.betType == "Yes"
                    ? message?.betType == "No"
                      ? "lay"
                      : "back"
                    : message?.betType
                }
              >
                {message?.betType}
              </span>
              <span className="line">
                {message?.teamName || message?.object?.runnerName}
              </span>
              <span className="line">BDT {message?.bidPrice}</span>
              <span>{message?.odds}</span>
            </div>
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Message;
