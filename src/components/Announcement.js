import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import OutsideClickHandler from "react-outside-click-handler";
import AuthContext from "../context/AuthContext";
import obj from "../Utils/helpers";
const Announcement = ({ data }) => {
  const { setAnnouncement } = useContext(AuthContext);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setAnnouncement(false);
      }}
    >
      <div className="market-depth-modal market-depth-modal-announcement">
        <div className="market-title">
          <h4>Announcement</h4>
          <Button
            onClick={() => setAnnouncement(false)}
            className="border-0 abc text-white position-absolute end-0 top-0 pt-1 fs-4 bg-transparent border-0"
          >
            <RxCross2 />
          </Button>
        </div>
        <div className="announcement-main">
          {data?.map((res) => {
            return (
              <div className="announcement-main-inner">
                <div class="mb-2">
                  <span class="announcement-main-time text-white font-bold bg-black">
                    {obj?.msgDateFormat(res?.createdAt,'date')}
                  </span>
                </div>
                <p class="announcement-main-content">
                  <p>{res?.message}</p>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Announcement;
