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
import memberHeaderBg from "../assets/images/member-header-bg.png";
import DepositIcon from "../assets/images/icon-deposit.png";
import iconWithdrawal from "../assets/images/icon-withdrawal.png";
import iconBetReacord from "../assets/images/icon-bet-records.png";
import iconTurnover from "../assets/images/icon-turnover.png";

import iconRecords from "../assets/images/icon-records.png";
import iconWhatsapp from "../assets/images/icon-whatsapp.png";
import iconEmail from "../assets/images/icon-email.png";
import iconFb from "../assets/images/icon-facebook-messenger.png";
import iconLogout from "../assets/images/header-logout-icon.svg";
import iconProfile from "../assets/images/icon-profile.png";

import { HiOutlineRefresh } from "react-icons/hi";


const MyAccount = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
  });
  const {
    user,
    handleShowSidebar,
    showSidebar,
    amounutRefresh,
    refreshAmountLoader,
    userCoins,
    loginUser,logoutUser
  } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <LayoutNew>

      <div class="main dw-p deposit-box page-content-box w-100 bg-gradual-black">
        <div class="member-menu active">
          <div class="close" onClick={() => navigate(-1)}></div>
          <div class="member-header bonuswallet" >
            <div class="member-header-content">
             
              <div class="infor">
                <div class="account">
                  <span >Username :  {user?.user?.username}</span>
                  </div>
               
                </div>
                </div>
          </div>
                
            <div class="member-menu-content bonuswallet">
            <div class="member-menu-box balance-box">
              <div class="balance balance-row">
              <div class="text"> Main Wallet <div class="icon refresh" >
              <div onClick={amounutRefresh}>
                        <HiOutlineRefresh
                          size={20}
                          className={refreshAmountLoader ? "refresh-icon" : ""}
                        />
                      </div>
              </div>
              <div class="icon eyes" >

              </div>
              </div>
              {refreshAmountLoader ? (
                  <div class="loader-outer">
                    <span
                      class="loader-inner-icon"
                      style={{ animationDelay: "0s" }}
                    ></span>
                    <span
                      class="loader-inner-icon"
                      style={{ animationDelay: ".1s" }}
                    ></span>
                    <span
                      class="loader-inner-icon"
                      style={{ animationDelay: ".2s" }}
                    ></span>
                    <span
                      class="loader-inner-icon"
                      style={{ animationDelay: ".3s" }}
                    ></span>
                    <span
                      class="loader-inner-icon"
                      style={{ animationDelay: ".4s" }}
                    ></span>
                    <span
                      class="loader-inner-icon"
                      style={{ animationDelay: ".5s" }}
                    ></span>
                    <span
                      class="loader-inner-icon"
                      style={{ animationDelay: ".6s" }}
                    ></span>
                    <span
                      class="loader-inner-icon"
                      style={{ animationDelay: ".7s" }}
                    ></span>
                  </div>
                ) : (
                  <>
          
              <span class="amount totalBalanceWallet"><i ><i id="locale-util-dicrective-0" >BDT {userCoins?.balance?.toFixed()}</i></i></span>
              
              </>
                )}

              <span id="balanceHeader" >-</span>
              </div>
            </div>

              <div class="member-menu-box member-list">
                <div class="title"><h2 ><span >Funds</span></h2></div><ul class="align-center">
                <li class="deposit" onClick={() => navigate("/deposit")}> <a><span class="item-icon" ><img src={DepositIcon}/></span><p >Deposit</p></a></li>
                <li class="withdrawal" onClick={() => navigate("/withdraw")}> <a><span class="item-icon" ><img src={iconWithdrawal}/></span><p >Withdrawal</p></a></li>
                </ul>
                </div>
                <div class="member-menu-box member-list">
                <div class="title"><h2 ><span >My P&L</span></h2></div>
                <ul class="align-center">
                <li class="deposit" onClick={() => navigate("/turnover")}> <a><span class="item-icon" ><img src={iconRecords}/></span><p >Turnover</p></a></li>
                <li class="water" onClick={() => navigate("/profit-and-loss")}><a><span class="item-icon" ><img src={iconTurnover}/></span> <p>Profit & Loss</p></a></li>
                </ul>
                </div>
                  <div class="member-menu-box member-list">
                      <div class="title">
                          <h2 ><span >History</span></h2>
                      </div>
                      <ul class="align-center">
                        <li class="total" onClick={() => navigate("/bets-history")}><a><span class="item-icon"><img src={iconBetReacord}/></span><p>Bets History</p></a></li>
                        <li class="history" onClick={() => navigate("/account-statement")}><a><span class="item-icon" ><img src={iconRecords}/></span><p>Account Statement</p></a></li>
                      </ul>
                  </div>
                  <div class="member-menu-box member-list">
                          <div class="title"><h2 ><span >Profile</span></h2></div>
                        <ul >
                          <li class="account" onClick={() => navigate("/my-profile")}><a><span class="item-icon" ><img src={iconProfile}/></span><p >Personal Info</p></a></li>
                        {/* <li class="resetpasswords"><a><span class="item-icon" ></span><p >Reset password</p></a></li>
                        <li class="mail"><a><span class="item-icon" ></span> <p >Inbox</p><span class="notice">8</span></a></li>
                        <li class="recommendfriend"><a><span class="item-icon" ></span><p >Referral</p></a></li> */}
                        </ul>
                  </div>
                  <div class="member-menu-box member-list csicons">
                      <div class="title">
                        <h2 ><span >Contact Us</span></h2></div>
                        <ul class="align-center">
                          <li class="whatsapp"><a><span class="item-icon "><img src={iconWhatsapp}/></span><p class="">Whatsapp</p></a></li>
                          <li class="email "> <a><span class="item-icon "><img src={iconEmail}/></span><p class="">Email </p></a></li>
                          <li class="facebook-messenger "><a><span class="item-icon "><img src={iconFb}/></span><p class="">Facebook</p></a></li>
                        </ul>
                   </div>
                  <div class="member-menu-logout">
                    <a ><span class="item-icon me-2" ><img src={iconLogout}/></span>
                <div class="text" onClick={() => logoutUser()}><p >Log out</p></div>
                </a>
                </div>
                </div>
          </div>

        </div>
    </LayoutNew>
  );
};

export default MyAccount;