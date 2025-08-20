import LayoutNew from "../components/shared/LayoutNew";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate,Link ,useLocation} from "react-router-dom";
import React, { useContext, useEffect, useState,useRef } from "react";
import { Form, Button, InputGroup, ButtonGroup } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import { apiGet, apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthContext";
import ConfirmPin from "../components/ConfirmPin";
import Modal from "react-bootstrap/Modal";
import PhoneInput from "react-phone-input-2";
import DesktopSidebar from "../components/DesktopSidebar";
import { AmountArray } from "../Utils/constants";

const WithDraw = () => {
  const navigate = useNavigate();
  const { userCoins, amounutRefresh, user,sendMobileOTP,getProfileData,profileData, setSeconds,
    setMinutes,seconds,minutes,getSendOtpStatus,setSendOtpStatus ,downloadBar } = useContext(AuthContext);
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
    defaultValues:{bankAccount:profileData?.phone},
    mode: "onChange",
    shouldFocusError: true,
  });
  let location = useLocation();
  const [bank, setBank] = useState([]);
  const [confirmPin, setConfirmPin] = useState(false);
  const [pin, setPin] = useState("");
  const [afterData, setAfterData] = useState({});
  const [verifyEdit, setVerifyEdit] = useState({});
  const [verify, setVerify] = useState({});
  const handleCloseVerify= () => {
    setVerifyEdit({ status: false });
  };

  const onSubmit = async (body) => {
    // if(profileData?.isVerified){
     setConfirmPin(true);
     setAfterData(body);
    // }else{
    //   toast.error("Please verify you mobile");
    //  }
   };
   const [isLoader1, setLoader1] = useState(false);
   const [isLoader, setLoader] = useState(false);
  const AfterPinSubmit = async () => {
    setLoader(true)
    if(pin){
      
      let body = {
        amount: afterData?.amount,
        bank: afterData?.bank,
        AccountName: afterData?.accountName,
        BankAccount: afterData?.bankAccount,
        phone_number: user?.user?.username,
        pin: pin,
      };
     
      const { status, data } = await apiPost(apiPath.withdrawal, body);
      if (status == 200) {
        if (data?.success) {
          toast.success(data?.message);
          amounutRefresh();
          reset();
          setAfterData({});
          setPin("");
          setConfirmPin(false);
          setLoader(false);
        } else {
          toast.error(data?.message);
          reset();
          //setAfterData({});
          //setPin("");
          // setConfirmPin(false);
          setLoader(false);
        }
      } else {
        toast.error(data?.message);
        reset();
        //setAfterData({});
        //setPin("");
        // setConfirmPin(false);
        setLoader(false);
      }
    }else{
      toast.error("Please enter your password");
      setPin("");
      setLoader(false);
    }
    
  };

  const getBank = async () => {
    const { status, data } = await apiPost(apiPath.getBank, {
      type: "withdrawal",
    });
    if (status == 200) {
      if (data?.success) {
        setBank(data?.results?.bankList);
      }
    }
  };
  const getBankDetail = async (body) => {
    const { status, data } = await apiPost(apiPath.getBankDetail, {
      bank: body,
    });
    if (status == 200) {
      if (data?.success) {
         setValue("accountName", data?.results?.bankDetail?.account_name);
        //setValue("accountName", "Personal");
         setValue("bankAccount", data?.results?.bankDetail?.account_number);
      }
    }
  };

  useEffect(() => {
    getBank();
    getProfileData();
   
  }, []);

  const inputRef = useRef(null);
  const { t } = useTranslation();


  const {
    register: register1,
    handleSubmit: handleSubmit1,
    control: control1,
    formState: { errors: errors1 },
    reset: reset1,
  } = useForm({});

  
  const onSubmit1 = async (body) => {
   
    setLoader1(true);
    const { status, data } = await apiPost(apiPath.verifyOtp, {
      new_phone_number: inputRef?.current?.state.selectedCountry?.countryCode+body?.mobile?.substring(inputRef?.current?.state.selectedCountry?.countryCode?.length,
        body?.mobile?.toString()?.length
      ),
      phone_number:profileData?.phone?profileData?.phone:inputRef?.current?.state.selectedCountry?.countryCode+body?.mobile?.substring(inputRef?.current?.state.selectedCountry?.countryCode?.length,
        body?.mobile?.toString()?.length
      ),
      type:"password",
      password:body?.verificationCode
        // otp:body?.verificationCode
    });
    if (status === 200) {
      if (data.success) {
        
        setLoader1(false);
        handleCloseVerify();
        getProfileData();
        toast.success("Otp verified successfully");
        reset();
        setSendOtpStatus(false);
      } else {
        setLoader1(false);
        toast.error(data?.message);
      }
    } else {
      setLoader1(false);
      toast.error(data?.message);
    }
  };
  let priceValue=0;
  const priceCalculate = async (price) => {
    priceValue+=price;
    setValue("amount", priceValue);
  };
  const resetPrice = async () => {
   
    setValue("amount", "");
  };


  const [minWithdraw, setMinWithdraw] = useState(300);
  const [maxWithdraw, setMaxWithdraw] = useState(25000);

  // useEffect(() => {
  //   if (!isEmpty(profileData) && profileData?.limitSetting.length > 0) {
  //     setMinWithdraw(
  //       profileData?.limitSetting.length > 0 &&
  //         profileData?.limitSetting[0]?.minWithdraw
  //     );
  //     setMaxWithdraw(
  //       profileData?.limitSetting.length > 0 &&
  //         profileData?.limitSetting[0]?.maxWithdraw
  //     );
  //   }
  // }, [
  //   !isEmpty(profileData) &&
  //     profileData?.limitSetting.length > 0 &&
  //     profileData?.limitSetting[0]?.minWithdraw,
  // ]);
  return (
    <LayoutNew>
      <div>
      <div className={downloadBar?"p-title title-box deposit-tab":"p-title title-box deposit-tab banner-bar-height"}>
        {/* <IoMdArrowBack onClick={() => navigate(-1)} size={30} /> */}
        <div class="title w-100">
        <div class="row hidden-md-and-up mobile-header no-gutters">
         
          <div class={location.pathname=="/deposit"?"text-center mobile-header-item col col-6 selected":"text-center mobile-header-item col col-6"}>
            <Link to="/deposit" class="router-link-exact-active router-link-active" >
              <span>Deposit</span>
            </Link></div>
            <div to="" class={location.pathname=="/withdraw"?"text-center mobile-header-item col col-6 selected":"text-center mobile-header-item col col-6"}>
              <Link to="/withdraw" class="" >
                <span>Withdrawal</span>
                </Link>
                </div>
                </div>
          
          {/* {t("Deposit_Transaction")} */}
          
          
          </div>
      </div>
        <div className="main dw-p withdraw-box page-content-box w-100 bg-gradual-black">
        <DesktopSidebar/>
        <div className="width70">
        <div className="walletInfo-wrapper w-100 common-box dw-box">
              <div className="tol-wal-bal-box gap">
                <div className="item">
                  <span>{t("Total_Wallet_Balance")}</span>
                  <br />

                  <span class="amt">BDT {userCoins?.balance || 0}</span>
                  <span
                    onClick={() => navigate("/withdraw-history")}
                    className="walletBalance-button widraw-btn"
                  >
                    Withdraw history
                  </span>
                </div>
                <div className="item walletBalance-outer border-t mt-2 pt-1 flex-column">
                  <div className="d-flex justify-content-between w-100">
                    <span>{t("Withdrawal Amount")} </span>
                    <span>
                      BDT {" "}
                      {
                        parseFloat(userCoins?.balance).toFixed(2) - parseFloat(profileData?.availableTurnoverFinal).toFixed(2)>0?
                        parseFloat(userCoins?.balance).toFixed(2) - parseFloat(profileData?.availableTurnoverFinal).toFixed(2)
                        :0
                      }
                    </span>
                  </div>
                  <div className="d-flex justify-content-between w-100">
                    <span>{t("Holding Amount")} </span>
                    <span>BDT  {" "}{Number(profileData?.availableTurnoverFinal).toFixed(2) || 0} </span>
                  </div>
                </div>
              </div>
            </div>
          
          <div className="usrTrans-wrapper common-box form-f mb-66 ">
            <div className="withdraw-form usrTrans-form ">
              <Form
                onSubmit={handleSubmit(onSubmit)}
                id="deposit_form"
                class="deposit_form"
              >
                <div class="usrTrans-seperate bankInfoField member-menu-box">
                  <div class="transaction-title">
                    <span>{t("Bank")}</span>
                    <span class="important-icon">*</span>
                  </div>
                  <div class="transaction-option m-auto">
                    <select
                      {...register("bank", {
                        required: {
                          value: true,
                          message: t("Please_select_bank"),
                        },
                        onChange: (e) => {
                          getBankDetail(e?.target?.value);
                        },
                      })}
                      id="depositBankId"
                      class="gatewayBankSelect"
                    >
                      <option value="">{t("Select_Bank")}</option>
                      {bank?.length > 0 &&
                        bank?.map((res) => {
                          return (
                            <option value={res?._id}>{res?.bank_name}</option>
                          );
                        })}
                    </select>
                  </div>
                  {errors?.bank?.message && (
                    <div class="transaction-errMsg text-danger depositMsg">
                      {errors?.bank?.message}
                    </div>
                  )}
                </div>
                {!isEmpty(watch("bank")) && (
                  <>
                    <div class="usrTrans-seperate bankInfoField bankInfo member-menu-box">
                      <div class="transaction-title">
                        <span>Bank account / number</span>
                        <span class="copyBtn bg-gradient-secondary">
                          <i class="fas fa-copy"></i>
                        </span>
                      </div>
                      <div class="transaction-option m-auto">
                        <input
                        value={profileData?.phone}
                        disabled={true}
                          {...register("bankAccount", {
                            
                          })}
                          class="text-input"
                          id="depositAccNo"
                          style={{color:`#fff`}}
                        />
                      </div>{" "}
                      {errors?.bankAccount?.message && (
                        <div class="transaction-errMsg text-danger depositMsg">
                          {errors?.bankAccount?.message}
                        </div>
                      )}
                    </div>
                    <div class="usrTrans-seperate bankInfoField bankInfo member-menu-box">
                      <div class="transaction-title">
                        <span>{t("Account_Name")}</span>
                        <span class="copyBtn bg-gradient-secondary">
                          <i class="fas fa-copy"></i>
                        </span>
                      </div>
                      <div class="transaction-option m-auto">
                        <input
                          {...register("accountName", {
                            required: {
                              value: true,
                              message: "Please enter account name",
                            },
                          })}
                          disabled
                          class="text-input"
                          id="depositAccName"
                          style={{color:`#fff`}}
                        />
                      </div>{" "}
                      {errors?.accountName?.message && (
                        <div class="transaction-errMsg text-danger depositMsg">
                          {errors?.accountName?.message}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div class="usrTrans-seperate deposit-amount member-menu-box member-list select-group checkbox-style ">
                  <div class="transaction-title">
                    <span>{t("Amount")}</span>
                    <span class="important-icon">*</span>
                  </div>
                  <div class="transaction-option m-auto">
                    <input
                      {...register("amount", {
                        required: {
                          value: true,
                          message: t("Please_enter_amount"),
                        },
                        validate: (value) => {
                          if (value > 0) {
                            if (Number(value) > Number(maxWithdraw)) {
                              return (
                                "Amount should not be greater than " +
                                maxWithdraw
                              );
                            } else if (Number(value) < Number(minWithdraw)) {
                              return (
                                "Minimum Amount Should be greater than " +
                                minWithdraw
                              );
                            }
                          } else {
                            return t("Amount_0");
                          }
                        },
                      })}
                      type="number"
                      class="text-input"
                      id="depositAmt"
                      placeholder="0.00"
                      onClick={() => resetPrice()}
                    />
                  </div>
                  {errors?.amount?.message && (
                    <div class="transaction-errMsg text-danger depositMsg">
                      {errors?.amount?.message}
                    </div>
                  )}
                    <div  class="active">
                      <ul class="col4">
                    {AmountArray?.map((item,key) => {
                          return (
                    <li onChange={() => priceCalculate(item?.amount)}><input  type="radio" name="depositAmount" /><label><span > {"+" +item?.amount} </span></label></li>
                    )})}
    
                      </ul>
                  </div>
                </div>
              
                <div className="usrTrans-seperate member-menu-box">
                  <div className="transaction-title">
                    <span>{t("Mobile_Number")}</span>
                    <span className="important-icon"></span>
                  </div>
                  <div className="transaction-option m-auto">
                  <select
                      {...register("phone", {
                        required: {
                          value: true,
                          message: "Please select number",
                        },
                      })}
                      id="depositBankId"
                      class="gatewayBankSelect"
                      onChange={(e) => {
                        setValue("bankAccount", e.target.value);
                      }}
                    >
                      <option value="">{t("Please select number")}</option>

                      <option value={profileData?.phone}>
                        {profileData?.phone}
                      </option>

                      {profileData?.temporaryPhone &&
                        profileData?.temporaryPhone != 0 && (
                          <option value={profileData?.temporaryPhone}>
                            {profileData?.temporaryPhone}
                          </option>
                        )}
                    </select>
                    {errors?.phone?.message && (
                      <div class="transaction-errMsg text-danger depositMsg">
                        {errors?.phone?.message}
                      </div>
                    )}
                  </div>
                  {/* {profileData?.phone !="" && profileData?.isVerified==false &&
                  <Button
                  onClick={() => {{setVerifyEdit({ ...verifyEdit, status: true,item:profileData?.phone });}}}
                  className="theme-btn py-1 px-3 fs-6"
                >
                  {"Verify"}
                </Button>
                }  */}
                <Button
                  onClick={() => setVerifyEdit({ ...verifyEdit, status: true,phoneStatus:"add", item:profileData?.phone })}
                  className="theme-btn py-1 px-3 ms-2 fs-6"
                >
                  {"Add Phone"}
                </Button> 
                </div>

                <div className="usrTrans-seperate">
                  <div className="transaction-option">
                    <div className="transaction-btn">
                      <input
                        type="hidden"
                        id="withdrawBankCode"
                        name="withdrawBankCode"
                        value="BKASH"
                      />
                      <button
                        type="submit"
                        className="btn-submit bg-gradient-primary"
                      >
                        {t("WITHDRAW")}
                      </button>
                    </div>
                  </div>
                </div>

                <input id="maxWithdrawCountPerDay" value="0" type="hidden" />
              </Form>
            </div>
          </div>
        </div>
      </div></div>
      {verifyEdit?.status && (
       
       <Modal centered show={verifyEdit?.status} onHide={handleCloseVerify}>
         <Modal.Header closeButton>
           <Modal.Title>Add Number</Modal.Title>
         </Modal.Header>
         <Form onSubmit={handleSubmit1(onSubmit1)}>
         <Modal.Body>
        
         {
            verifyEdit?.phoneStatus=="add" &&
            <>
              <Form.Group className="form-group d-flex mb-3">
            
              <Controller
              className="form-group d-flex"
              control={control1}
              name="mobile"
              rules={{
                required: "Please enter mobile number.",
                validate: (value) => {
                  let inputValue = value
                    ?.toString()
                    ?.slice(
                      inputRef?.current?.state?.selectedCountry?.countryCode
                        ?.length,
                      value?.length
                  );
                  if (inputValue?.length < 10) {
                    return "Mobile number must contain 10 digit";
                  } else if (inputValue?.length > 12) {
                    return "Mobile number should not exceed 12 digit";
                  } else {
                    return true;
                  }
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <>
                  <PhoneInput
                    {...field}
                    // isValid={(value, country) => {
                    //   if (value.match(/12345/)) {
                    //     return 'Invalid value: '+value+', '+country.name;
                    //   } else if (value.match(/1234/)) {
                    //     return false;
                    //   } else {
                    //     return true;
                    //   }
                    // }}
                    inputExtraProps={{
                      ref,
                      required: true,
                      autoFocus: true,
                    }}
                    ref={inputRef}
                    inputStyle={{
                      width: "100%",
                      height: "38px",
                    }}
                    country={"bd"}
                    enableSearch
                    countryCodeEditable={false}
                  />
                </>
              )}
            />
          </Form.Group>
          {errors1?.mobile?.message && (
            <div className="text-danger">{errors1?.mobile?.message}</div>
          )}
           </>
            }
          
      
          <div style={{ position:'relative',width:`100%`}} className="mb-2">
            <Form.Group className="d-flex ">
          <div style={{ position:'relative',width:`100%`}} className="mb-2">
          <Form.Control
                     type="text"
                     placeholder="Enter password"
                     className={errors1.verificationCode ? " is-invalid " : ""}
                     {...register1("verificationCode", {
                       required: "Please enter password",
                     
                     })}
                   />        
          </div>
          </Form.Group>
          {errors1?.verificationCode?.message && (
           <div className="text-danger">{errors1?.verificationCode?.message}</div>
         )}
         </div> 
         
   
     
           {/* { getSendOtpStatus? 
     <Button 
        disabled={seconds > 0 || minutes > 0}
       
          onClick={() => sendMobileOTP("resend",inputRef?.current?.state?.formattedNumber?inputRef?.current?.state?.formattedNumber.replace(/\s/g, '').replace(/\+/g, ''):profileData?.phone)} 
          className="theme-btn py-1 px-3 fs-6">{"Resend Otp"}
      </Button>:
       <Button onClick={() => sendMobileOTP("first",inputRef?.current?.state?.formattedNumber?inputRef?.current?.state?.formattedNumber.replace(/\s/g, '').replace(/\+/g, ''):profileData?.phone)} className="theme-btn py-1 px-3 fs-6">{"Send Otp"}
      </Button>} */}
      {/* <div className="countdown-text">
      {seconds > 0 || minutes > 0 ? (
        <p>
          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p>Didn't recieve code?</p>
      )}

      
    </div> */}
         </Modal.Body>
         <Modal.Footer>
         <button type="submit" className="submit-btn"  disabled={isLoader1?"disabled":""}>
             <span>  {isLoader1 ? "Loading..." : t("Confirm")}</span>
            
           </button>
         
           
         </Modal.Footer>
         </Form>
       </Modal>
     )}
      {confirmPin && !isEmpty(afterData) && (
        <ConfirmPin
        isLoader={isLoader}
          show={confirmPin}
          handelClose={() => setConfirmPin(false)}
          pin={pin}
          setPin={setPin}
          onSubmit={AfterPinSubmit}
        />
      )}
    </LayoutNew>
  );
};

export default WithDraw;
