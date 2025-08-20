import React from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import LayoutComponent from "./Layout";
import { IoMdArrowBack } from "react-icons/io";

const SidebarLayout = ({ heading, children }) => {
  const navigate = useNavigate();
  return (
    <div>
      <LayoutComponent visibilityType={true}>
        {/* <div className="balance-label position-relative">
          <button className="bg-transparent border-0 text-white position-absolute start-0 pt-0">
            <FaAngleLeft className="fs-3" onClick={() => navigate(-1)} />
          </button>
          {heading}
        </div> */}
        <div class="p-title title-box">
          <IoMdArrowBack onClick={() => navigate(-1)} size={30} />
          <div class="title w-100">{heading}</div>
        </div>
        {children}
      </LayoutComponent>
    </div>
  );
};

export default SidebarLayout;
