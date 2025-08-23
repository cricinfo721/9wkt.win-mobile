import React, { useContext, useEffect, useState } from "react";
import LayoutNew from "../components/shared/LayoutNew";
import { Form, Button, InputGroup, ButtonGroup } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthContext";
import promotioBg from "../assets/images/promotion-bg.svg";
import iconClock from "../assets/images/icon-clock.svg";



const Promotions = () => {
  const {
   
    formState: { errors },
  } = useForm({
    
  });
  
  return (
    <LayoutNew>
      {/* <div class="top-class">
        <div  class="promotion-box new promotion-toggle ">
          <div  class="pic ">
        <img  class="" alt="image_90025" src="https://img.b112j.com/upload/h5Announcement/image_90025.jpg" loading="lazy"/>
          <span  class="item-bg "><img  class="" alt="image_90025" src={promotioBg} loading="lazy"/></span>
        </div>
        <span className="new_tag">NEW</span>
        <div  class="promotion-box-inner content-style ">
          <div  class="text-main ">
            <h3  class="">2% Unlimited Rebate</h3>
        <p  class="">Happy Hour</p>
      </div>
        <div  class="times ">
          <span  class="item-icon me-2"> 
          <img  alt="image_90025" src={iconClock} loading="lazy"/>
          </span>
          <span  class="">2023/12/19 00:00:00 ~ 2023/12/19 04:00:00</span>
          </div>
      <div  class="button-box ">
        <div  mcdneuaclick="" class="button btn-primary ">
          <span  class=""> Details </span>
        </div>
      </div>
      
      </div>
      </div>
      </div> */}
     
    </LayoutNew>
  );
};

export default Promotions;
