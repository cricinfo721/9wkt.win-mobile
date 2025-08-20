import React, { useContext } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import AuthContext from "../context/AuthContext";
import { RxCross2 } from "react-icons/rx";
import { Button } from "react-bootstrap";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";
const CalendarComponent = () => {
  const { setShowDate, plDate, setPlDate, showDate } = useContext(AuthContext);
  const reset = () => {
    setShowDate({ status: false, type: "" });
  };
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        reset();
      }}
    >
      <div className="market-depth-modal">
        <div className="market-title">
          <h4>{showDate?.type}</h4>
          <Button
            onClick={reset}
            className="border-0 abc text-white position-absolute end-0 top-0 pt-1 fs-4 bg-transparent border-0"
          >
            <RxCross2 />
          </Button>
        </div>
        <div className="d-flex justify-content-center align-items-center w-100">
          {showDate?.type == "During" ? (
            <div className="p-2 calendar-button">
              <Button
                onClick={() => {
                  setPlDate([
                    {
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    },
                  ]);
                  reset();
                }}
              >
                Today
              </Button>
              <Button
                onClick={() => {
                  setPlDate([
                    {
                      startDate: moment(new Date()).subtract(1, "days")._d,
                      endDate: new Date(),
                      key: "selection",
                    },
                  ]);
                  reset();
                }}
              >
                From Yesterday
              </Button>
              <Button
                onClick={() => {
                  {
                    setPlDate([
                      {
                        startDate: moment(new Date()).subtract(7, "days")._d,
                        endDate: new Date(),
                        key: "selection",
                      },
                    ]);
                    reset();
                  }
                }}
              >
                Last 7 Days
              </Button>
            </div>
          ) : (
            <DateRange
              editableDateInputs={false}
              showDateDisplay={false}
              maxDate={new Date()}
              onChange={(item) => {
                setPlDate([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={plDate}
              rangeColors={["#9CB1BD"]}
            />
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default CalendarComponent;
