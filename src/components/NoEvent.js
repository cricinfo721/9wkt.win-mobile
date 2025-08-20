import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const NoEvent = () => {
  return (
    <div className="no-event-outer">
      <div className="no-event">
        <BiLoaderAlt color="lightgrey" size={55} className="mb-2"/>
        No Event
      </div>
    </div>
  );
};

export default NoEvent;
