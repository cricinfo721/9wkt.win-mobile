import React from "react";
import { AiOutlineAudio } from "react-icons/ai";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import moment from "moment";

const CurrentNews = ({ message, setAnnouncement }) => {
  return (
    <>
      <div
        onClick={() => {
          if (message?.length > 0) {
            setAnnouncement(true);
          }
        }}
        className="marquee-notification d-flex"
      >
        <div className="audio-trakcer">
          <HiOutlineSpeakerphone />
        </div>
         {message?.length > 0 && (
          <marquee direction="left">
            {message?.map((res) => {
              return (
                <strong style={{ color: `#fff`, marginRight: "20px" }}>
                  <span style={{ fontWeight: "500" }}>
                    {moment(res?.msgDate).format("DD-MM-YYYY")} :
                  </span>{" "}
                  {res?.message}
                </strong>
              );
            })}
          </marquee>
        )}
      </div>
    </>
  );
};

export default CurrentNews;
