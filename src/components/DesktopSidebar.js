import React, { useContext, useEffect, useState } from "react";
import LayoutNew from "../components/shared/LayoutNew";
import { Form, Button, InputGroup, ButtonGroup } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate,Link } from "react-router-dom";
import { apiGet, apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthContext";

import Accordion from 'react-bootstrap/Accordion';
import { BsChevronRight } from "react-icons/bs";
import { t } from "i18next";

const DesktopSidebar = () => {
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
  
  const {t} = useTranslation()
  return (
    <div class="width30">
   
    <Accordion>
    <Accordion.Item eventKey="0">
      <Accordion.Header> 
        <span aria-hidden="true" width="24" height="24" class="v-icon notranslate parentNav-icon theme--light primary--text">
          <svg data-v-f1505584="" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="v-icon__component theme--light primary--text"><path data-v-f1505584="" d="M13.6359 11.2678H11.9539C10.9124 11.2678 10.0311 10.3866 10.0311 9.34543V6.4011C10.0311 6.00053 10.2715 5.7605 10.6717 5.7605C11.0723 5.7605 11.3127 6.00052 11.3127 6.4011V9.34543C11.3127 9.746 11.5527 9.98603 11.9533 9.98603H13.6357C14.0362 9.98603 14.2766 10.2264 14.2766 10.6269C14.2766 11.0275 13.8763 11.2679 13.636 11.2679L13.6359 11.2678Z" fill="black"></path><path data-v-f1505584="" d="M11.1626 17.6747C10.2177 17.6747 9.28709 17.526 8.39675 17.2332C7.98935 17.099 7.7683 16.6602 7.90217 16.2533C8.03605 15.8462 8.47485 15.6242 8.8821 15.7587C9.61551 15.9999 10.3828 16.1223 11.1622 16.1223C15.1792 16.1223 18.447 12.8544 18.447 8.83743C18.4472 4.82045 15.1795 1.55261 11.1626 1.55261C7.14558 1.55261 3.87774 4.82049 3.87774 8.83743C3.87774 9.26623 3.53022 9.61374 3.10143 9.61374C2.67264 9.61374 2.32513 9.26622 2.32513 8.83743C2.32513 3.96458 6.28971 0 11.1626 0C16.0354 0 20 3.96458 20 8.83743C20 13.7103 16.0354 17.6749 11.1626 17.6749L11.1626 17.6747Z" fill="black"></path><path data-v-f1505584="" d="M3.08909 9.78857C2.47045 9.78857 1.99512 9.39603 1.77528 9.02969L0.109251 6.2291C-0.109992 5.86051 0.0111539 5.3841 0.37944 5.16503C0.748335 4.94608 1.22445 5.06693 1.44352 5.43521L3.10694 8.23111C3.10573 8.22807 3.10725 8.22898 3.10937 8.2302C3.11968 8.2261 3.13302 8.21989 3.15031 8.21033L6.03656 6.47549C6.40394 6.25473 6.88095 6.3736 7.102 6.74098C7.32276 7.10866 7.20389 7.58536 6.83651 7.80642L3.9272 9.5543C3.62835 9.72063 3.34649 9.78856 3.08903 9.78856L3.08909 9.78857Z" fill="black"></path>
          </svg>
          </span>History
          </Accordion.Header>
      <Accordion.Body>
      <div>
            <Link to="/current-bets" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">Current Bets</div>
                      <BsChevronRight/>
                      </div>
                      
                    </div>
                </div>
            </Link>
          </div>
      <div class="v-list-group__items" >
        <div>
            <Link to="/bets-history" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">Bet History</div>
                      <BsChevronRight/>
                      </div>
                      
                    </div>
                </div>
            </Link>
          </div>
          </div>
          <div class="v-list-group__items" >
        <div>
            <Link to="/account-statement" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">Account Statement</div>
                      <BsChevronRight/>
                      </div>
                      
                    </div>
                </div>
            </Link>
          </div>
          
          <div>
            <Link to="/profit-and-loss" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">Turnover History</div>
                      <BsChevronRight/>
                      </div>
                      
                    </div>
                </div>
            </Link>
          </div>
          <div>
            <Link to="/deposit-history" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">Wallet History</div>
                      <BsChevronRight/>
                      </div>
                     
                    </div>
                </div>
            </Link>
          </div>
          <div>
           </div>
          </div>
      </Accordion.Body>
    </Accordion.Item>
    {/* <Accordion.Item eventKey="1">
      <Accordion.Header> 
      <span aria-hidden="true" width="24" height="24" class="v-icon notranslate parentNav-icon theme--light primary--text">
          <svg data-v-2c882428="" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="v-icon__component theme--light primary--text"><path data-v-2c882428="" d="M3.44736 11.4561C3.34026 11.4561 3.27604 11.5416 3.27604 11.6274V12.6125C3.27604 12.6981 3.36162 12.7838 3.44736 12.7838H10.7707C11.0277 12.2913 11.3703 11.8416 11.7558 11.4562L3.44736 11.4561Z" fill="black"></path><path data-v-2c882428="" d="M3.44736 8.05127C3.34026 8.05127 3.27604 8.13686 3.27604 8.2226V9.20769C3.27604 9.31479 3.36162 9.37901 3.44736 9.37901H13.5545C13.6616 9.37901 13.7258 9.29343 13.7258 9.20769V8.2226C13.7258 8.1155 13.6402 8.05127 13.5545 8.05127H3.44736Z" fill="black"></path>
          <path data-v-2c882428="" d="M10.1283 14.8608H1.99125C1.62724 14.8608 1.32748 14.561 1.32748 14.197V6.05994H15.653V9.74304H15.8457C16.2311 9.74304 16.6166 9.78591 16.9806 9.85014V3.55461C16.9806 3.06214 16.7879 2.59104 16.4667 2.24839V2.22703H16.4453C16.0813 1.82014 15.5459 1.56325 14.9677 1.56325H13.5117V0.663776C13.5117 0.299768 13.2119 0 12.8479 0H11.8415C11.4775 0 11.1777 0.29978 11.1777 0.663776V1.54176H5.78155V0.663776C5.78155 0.299768 5.48177 0 5.11778 0H4.11135C3.74734 0 3.44757 0.29978 3.44757 0.663776V1.54176H1.99154C1.41334 1.54176 0.878006 1.79868 0.513978 2.20554H0.492469V2.2269C0.19269 2.56955 0 3.04065 0 3.53311V14.1756C0 15.2891 0.899362 16.1669 1.99137 16.1669H10.1285C10.1071 15.9314 10.0856 15.7172 10.0856 15.4816C10.0857 15.2891 10.1071 15.0749 10.1285 14.8609L10.1283 14.8608Z" fill="black"></path><path data-v-2c882428="" d="M15.8457 11.0063C13.3617 11.0063 11.3489 13.0192 11.3489 15.5032C11.3489 17.9871 13.3618 20 15.8457 20C18.3297 20 20.3425 17.9871 20.3425 15.5032C20.3425 13.0192 18.3296 11.0063 15.8457 11.0063ZM15.8457 18.6723C14.1113 18.6723 12.6766 17.259 12.6766 15.5032C12.6766 13.7472 14.0899 12.3341 15.8457 12.3341C17.6017 12.3341 19.0149 13.7474 19.0149 15.5032C19.015 17.259 17.6017 18.6723 15.8457 18.6723Z" fill="black"></path><path data-v-2c882428="" d="M17.4303 14.7752L16.5952 14.6468C16.5309 14.6468 16.4881 14.6039 16.4452 14.5397L16.0598 13.7688C15.9743 13.5761 15.7172 13.5761 15.6101 13.7688L15.2461 14.5183C15.2247 14.5826 15.1605 14.6039 15.0961 14.6254L14.2397 14.7539C14.047 14.7752 13.9612 15.0323 14.1112 15.1821L14.7108 15.7603C14.7536 15.8032 14.775 15.8674 14.775 15.9316L14.625 16.7881C14.5822 16.9808 14.7964 17.1521 14.989 17.045L15.7387 16.6383C15.8029 16.6169 15.8672 16.6169 15.91 16.6383L16.6596 17.0452C16.8309 17.1307 17.0449 16.9809 17.0236 16.7882L16.8736 15.9531C16.8736 15.8889 16.8736 15.8247 16.9378 15.7818L17.5588 15.1822C17.7087 15.0536 17.623 14.7967 17.4303 14.7752V14.7752Z" fill="black"></path></svg>
          </span>Special</Accordion.Header>
      <Accordion.Body>
      <div>
            <Link to="/refer" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">Refer & Earn</div>
                      <BsChevronRight/>
                      </div>
                      
                    </div>
                </div>
            </Link>
          </div>
          <div>
            <Link to="/affilate" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">{t("Affiliate")}</div>
                      <BsChevronRight/>
                      </div>
                      
                    </div>
                </div>
            </Link>
          </div>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3">
      <Accordion.Header> 
      <span aria-hidden="true" width="24" height="24" class="v-icon notranslate parentNav-icon theme--light primary--text">
      <svg data-v-631855c6="" width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="v-icon__component theme--light primary--text">
      <path data-v-631855c6="" d="M16.4263 9.15985H12.6466C12.3298 9.15985 12.073 9.41338 12.073 9.72586V9.76089C11.1115 9.5478 10.2197 9.09937 9.4797 8.45691C8.68406 7.61263 8.27524 6.48265 8.34879 5.33193C8.34879 4.6977 7.64654 4.03484 6.87545 3.94101C6.38247 3.88121 5.17304 3.97638 4.6208 6.15616V6.15633C4.44139 7.07086 4.40947 8.00764 4.52606 8.93209H2.25467C1.56588 8.92316 0.917896 9.254 0.527525 9.81411C0.0319686 10.5063 -0.366093 11.8677 0.548009 14.4262L1.5753 18.0881C1.68131 18.6264 1.97373 19.1117 2.40272 19.4606C2.83152 19.8095 3.3701 20.0002 3.92605 20H6.69828C7.72623 20 10.4392 19.8309 12.0734 19.1682V19.3606H12.0732C12.0732 19.6732 12.3301 19.9266 12.6468 19.9266H16.4264C16.7433 19.9266 17 19.6732 17 19.3606V9.72578C17 9.57569 16.9396 9.43166 16.832 9.32554C16.7245 9.21942 16.5785 9.15978 16.4264 9.15978L16.4263 9.15985ZM6.69825 18.8679H3.92602C3.63395 18.8681 3.35128 18.767 3.12697 18.5826C2.90266 18.3979 2.75108 18.1415 2.69884 17.858C2.69594 17.8415 2.69184 17.825 2.68741 17.8087L1.64835 14.1052C1.6446 14.0926 1.64067 14.0798 1.63624 14.0673C0.807643 11.7587 1.24004 10.7808 1.46451 10.4675H1.46434C1.63999 10.2079 1.93857 10.0556 2.25469 10.0642H5.17747C5.34595 10.0642 5.50607 9.99092 5.61517 9.86408C5.72425 9.73706 5.77102 9.56929 5.74337 9.40502C5.74046 9.387 5.44157 7.58506 5.73398 6.43063C5.94753 5.58786 6.29373 5.07593 6.66019 5.06127V5.06144C6.87972 5.06885 7.08183 5.18104 7.20199 5.36246C7.13268 6.80375 7.66254 8.2105 8.66881 9.25708C9.71521 10.2897 11.2819 10.7494 12.0729 10.9256L12.0731 17.9113C11.2322 18.4666 8.66129 18.8679 6.69803 18.8679L6.69825 18.8679ZM15.8529 18.7947H13.2204V10.2915H15.8529V18.7947ZM6.03751 2.16646V0.566003C6.03751 0.253354 6.29424 0 6.61107 0C6.92789 0 7.18463 0.253354 7.18463 0.566003V2.16646C7.18463 2.47895 6.92789 2.73247 6.61107 2.73247C6.29424 2.73247 6.03751 2.47895 6.03751 2.16646ZM9.07482 4.1133V4.11313C8.91146 3.84529 8.9992 3.49762 9.27045 3.33638L10.6603 2.51112C10.7907 2.43076 10.9485 2.40533 11.098 2.4407C11.2476 2.47608 11.3764 2.56923 11.4558 2.69928C11.535 2.82932 11.5581 2.98531 11.5198 3.1322C11.4814 3.27926 11.385 3.40476 11.2518 3.4809L9.86212 4.30633C9.59088 4.46755 9.23839 4.38096 9.075 4.11329L9.07482 4.1133ZM1.77476 2.70435C1.93847 2.43685 2.29046 2.35043 2.56206 2.5113L3.95193 3.33657L3.95176 3.3364C4.08491 3.41254 4.18136 3.53821 4.21976 3.68509C4.25817 3.83198 4.23496 3.98814 4.15575 4.11802C4.07638 4.24806 3.9475 4.34122 3.79796 4.37659C3.64842 4.41197 3.49087 4.3867 3.36044 4.30618L1.97056 3.48091C1.69915 3.3197 1.61158 2.97201 1.77477 2.70434L1.77476 2.70435Z" fill="black"></path>
      </svg>
      </span>
          Social</Accordion.Header>
      <Accordion.Body>
      <div>
            <Link to="#" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">Facebook</div>
                      <BsChevronRight/>  </div>
                     
                    </div>
                </div>
            </Link>
          </div>
          <div>
            <Link to="#" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">Whatsapp</div>
                      <BsChevronRight/></div>
                      
                    </div>
                </div>
            </Link>
          </div>
          <div>
            <Link to="#" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">Instagram</div>
                      <BsChevronRight/> </div>
                      
                    </div>
                </div>
            </Link>
          </div>
          <div>
            <Link to="#" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">Telegram</div>
                      <BsChevronRight/></div>
                      
                    </div>
                </div>
            </Link>
          </div>
          <div>
            <Link to="#" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">Youtube</div>
                      <BsChevronRight/> </div>
                     
                    </div>
                </div>
            </Link>
          </div>
      </Accordion.Body>
    </Accordion.Item> */}
    <Accordion.Item eventKey="4">
      <Accordion.Header> <span aria-hidden="true" width="24" height="24" class="v-icon notranslate parentNav-icon theme--light primary--text"><svg data-v-4bbcf2f2="" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="v-icon__component theme--light primary--text"><path data-v-4bbcf2f2="" d="M20.0008 11.8533L20.0001 7.99653C20.0001 7.57825 19.6619 7.24001 19.2436 7.24001L17.6034 7.23984C17.5217 7.01221 17.4302 6.79046 17.3304 6.57483L18.4901 5.41507C18.6323 5.27288 18.7119 5.08138 18.7119 4.88027C18.7119 4.67898 18.6325 4.48681 18.4901 4.34547L15.6547 1.51155C15.371 1.22785 14.8679 1.22785 14.5849 1.51155L13.4252 2.67132C13.2095 2.57067 12.988 2.47915 12.761 2.39826V0.756521C12.761 0.338238 12.4221 0 12.0045 0H7.99714C7.57953 0 7.24062 0.338238 7.24062 0.756521V2.3967C7.01366 2.47911 6.79193 2.56996 6.57496 2.67128L5.41671 1.51151C5.27452 1.37 5.08235 1.28979 4.88191 1.28979C4.68147 1.28979 4.48845 1.36916 4.34712 1.51151L1.51237 4.34544C1.37001 4.48763 1.29065 4.6798 1.29065 4.88024C1.29065 5.08068 1.37001 5.2737 1.51237 5.41503L2.67131 6.5748C2.57067 6.79044 2.47915 7.01198 2.39826 7.2398H0.756521C0.338913 7.2398 0 7.57804 0 7.99633V12.0037C0 12.4204 0.338913 12.7602 0.756521 12.7602H2.39739C2.47828 12.9865 2.57065 13.208 2.67045 13.4252L1.51068 14.5835C1.3685 14.7256 1.28896 14.9187 1.28896 15.1183C1.28896 15.3195 1.36833 15.5117 1.51068 15.6546L4.34612 18.4885C4.48831 18.6292 4.67981 18.7087 4.88092 18.7087C5.08221 18.7087 5.27438 18.6293 5.41571 18.487L6.57311 17.3287C6.79027 17.4309 7.01267 17.5224 7.23876 17.6033L7.23808 19.2435C7.23808 19.4448 7.31745 19.6369 7.4598 19.7783C7.60199 19.9198 7.79416 20 7.9946 20H12.0035C12.4211 20 12.76 19.6618 12.76 19.2435V17.6033C12.9869 17.5224 13.2087 17.43 13.4256 17.3287L14.5839 18.4885C14.7261 18.6307 14.9176 18.7102 15.1187 18.7102C15.32 18.7102 15.5122 18.6308 15.6535 18.4885L18.4882 15.653C18.7841 15.3572 18.7841 14.8791 18.4882 14.5833L17.3293 13.425C17.4299 13.2094 17.5215 12.9878 17.6032 12.76H19.2434H19.251C19.6936 12.7555 20.0158 12.4248 20.0158 12.0035C20.0159 11.9522 20.0107 11.9024 20.0007 11.8532L20.0008 11.8533ZM17.0534 11.2472C16.7152 11.2472 16.4186 11.472 16.3264 11.7972C16.1834 12.295 15.9882 12.7694 15.7454 13.2035C15.5812 13.4994 15.6326 13.867 15.8717 14.1061L16.8839 15.1183L15.1197 16.8848L14.1075 15.8711C13.8684 15.6335 13.5001 15.5798 13.2042 15.7455C12.7662 15.9907 12.2934 16.1857 11.7986 16.325C11.4734 16.418 11.2479 16.7154 11.2479 17.0535V18.4879H8.75292V17.0535C8.75292 16.7153 8.52816 16.4181 8.20226 16.325C7.70832 16.1858 7.23551 15.9913 6.7966 15.7455C6.6816 15.6804 6.55444 15.6494 6.42898 15.6494C6.23225 15.6494 6.03856 15.7265 5.89267 15.8711L4.882 16.8833L3.11598 15.1191L4.12902 14.1069C4.36729 13.8678 4.41948 13.4995 4.25534 13.2043C4.01251 12.7687 3.81729 12.2958 3.6758 11.798C3.58343 11.4728 3.28623 11.248 2.94798 11.248H1.51297V8.7537H2.94733C3.28557 8.7537 3.58277 8.52894 3.67515 8.20217C3.81582 7.70741 4.01035 7.23456 4.25469 6.79738C4.42035 6.50152 4.36817 6.13237 4.12906 5.89327L3.11756 4.88022L4.88186 3.11606L5.89404 4.12975C6.13315 4.36735 6.50077 4.41953 6.79733 4.25539C7.23386 4.01172 7.70736 3.81669 8.20299 3.67434C8.52907 3.58281 8.75365 3.28544 8.75365 2.94739V1.51302H11.248V2.94739C11.248 3.28562 11.4734 3.58433 11.7986 3.67589C12.2934 3.81656 12.7662 4.01109 13.2034 4.25543C13.4993 4.42109 13.8684 4.36891 14.1067 4.1298L15.1198 3.1161L16.8854 4.88027L15.8717 5.89396C15.6326 6.13307 15.5804 6.5029 15.7461 6.79656C15.9883 7.23223 16.1833 7.70507 16.3256 8.20286C16.4187 8.5281 16.7161 8.75288 17.0535 8.75288H18.4878L18.4885 11.2472H17.0534Z" fill="black"></path><path data-v-4bbcf2f2="" d="M10 5.94995C7.76675 5.94995 5.94958 7.7656 5.94958 10.0004C5.94958 12.2328 7.76593 14.0508 10 14.0508C12.2339 14.0508 14.0504 12.2336 14.0504 10.0004C14.0504 7.76642 12.2333 5.94995 10 5.94995ZM10 12.5377C8.60113 12.5377 7.46263 11.3999 7.46263 10.0004C7.46263 8.6008 8.60113 7.46299 10 7.46299C11.3989 7.46299 12.5374 8.6008 12.5374 10.0004C12.5374 11.3999 11.3989 12.5377 10 12.5377Z" fill="black"></path></svg></span>
          Setting</Accordion.Header>
      <Accordion.Body>
      <div>
            <Link to="/my-profile" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">{t("My_Profile")}</div>
                      <BsChevronRight/></div>
                     
                    </div>
                </div>
            </Link>
          </div>
          <div>
            <Link to="/reset-password" class="child-list-item v-list-item v-list-item--link theme--light" >
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">{t("Change_Password")}</div>
                      <BsChevronRight/> </div>
                      
                    </div>
                </div>
            </Link>
          </div>
          <div>
            <Link to="#" class="child-list-item v-list-item v-list-item--link theme--light"  onClick={() => logoutUser()}>
                <div class="v-list-group childNav-list-group ">
                    <div class="v-list-group__header v-list-item v-list-item--link theme--light">
                      <div class="v-list-item__content"><div class="v-list-item__title childNav-title">{t("Logout")}</div>
                      <BsChevronRight/> </div>
                     
                    </div>
                </div>
            </Link>
          </div>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
      {/* <div class="member-menu active">
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
                    <div class="title">
                        <h2 ><span >History</span></h2>
                    </div>
                    <ul class="align-center">
                      <li class="total" onClick={() => navigate("/bets-history")}><a><span class="item-icon"><img src={iconBetReacord}/></span><p>Bets History</p></a></li>
                      <li class="water" onClick={() => navigate("/profit-and-loss")}><a><span class="item-icon" ><img src={iconTurnover}/></span> <p>Profit & Loss</p></a></li>
                      <li class="history" onClick={() => navigate("/account-statement")}><a><span class="item-icon" ><img src={iconRecords}/></span><p>Account Statement</p></a></li>
                    </ul>
                </div>
                <div class="member-menu-box member-list">
                        <div class="title"><h2 ><span >Profile</span></h2></div>
                      <ul >
                        <li class="account" onClick={() => navigate("/my-profile")}><a><span class="item-icon" ><img src={iconProfile}/></span><p >Personal Info</p></a></li>
                       <li class="resetpasswords"><a><span class="item-icon" ></span><p >Reset password</p></a></li>
                      <li class="mail"><a><span class="item-icon" ></span> <p >Inbox</p><span class="notice">8</span></a></li>
                      <li class="recommendfriend"><a><span class="item-icon" ></span><p >Referral</p></a></li> 
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
      </div> */}

      </div>
  );
};

export default DesktopSidebar;
