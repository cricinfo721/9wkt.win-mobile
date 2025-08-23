import React, { useContext, useEffect, useState } from "react";
import LayoutNew from "../components/shared/LayoutNew";
import { Form, Button, InputGroup, ButtonGroup } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { inRange, isEmpty } from "lodash";
import { IoMdArrowBack } from "react-icons/io";
import { useLocation,useNavigate,Link } from "react-router-dom";
import { apiGet, apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "react-toastify";
import moment from "moment";
import { AmountArray,validationRules } from "../Utils/constants";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthContext";
import iconBkash from "../assets/images/bkash.png";
import iconRocket from "../assets/images/rocket.png";
import iconNagad from "../assets/images/nagad.png";
import iconEth from "../assets/images/eth.svg";
import iconBtc from "../assets/images/btc.svg";
import iconUpay from "../assets/images/upay.png";
import iconTrc20 from "../assets/images/trc20.svg";
import selectCheck from "../assets/images/select-check.svg";
import { FaBtc } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import DesktopSidebar from "../components/DesktopSidebar";
import depositvideo from "../assets/images/deposit-video.mp4";
import ReactPlayer from "react-player";

const Deposit = () => {
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
  let location = useLocation();

  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [bank, setBank] = useState([]);
  const { userCoins, amounutRefresh, amountDeposit, getProfileData,downloadBar,profileData } =useContext(AuthContext);
  const [isLoader, setLoader] = useState(false);

  const onSubmit = async (body) => {
    setLoader(true);
    let imageCheck = "";
    if (image !== "") {
      imageCheck = await uploadImage(image);
    }
    body = {
      transactionType: body?.depositType,
      amount: body?.amount,
      TransactionId: body?.transactionId,
      TransactionFile: image !== "" ? imageCheck : "",
      bank: body?.bank,
      AccountName: body?.accountName,
      BankAccount: body?.bankAccount,
      bonus: body?.bonus,
       // payment: "online",
      // receiptDate: body?.receiptDate,
    };
    const { status, data } = await apiPost(apiPath.depositAmount, body);
    if (status == 200) {
      if (data?.success) {
        toast.success(data?.message);
         // window.location.href=data?.results?.payment_url
        amounutRefresh();
        getProfileData();
        setImage("");
        reset();
        setLoader(false);
      } else {
        toast.error(data?.message);
        setLoader(false);
      }
    } else {
      toast.error(data?.message);
      setLoader(false);
    }
  };

  const getBank = async () => {
    const { status, data } = await apiPost(apiPath.getBank, {
      type: "deposit",
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
        setValue("bankAccount", data?.results?.bankDetail?.account_number);
      }
    }
  };

  const uploadImage = async (obj) => {
    let form = new FormData();
    form.append("TransactionFile", obj);
    const { status, data } = await apiPost(apiPath.reciptUpload, form);
    if (status == 200) {
      return data?.path;
    } else {
      return false;
    }
  };
  useEffect(() => {
    getBank();
    setValue("depositType", "online");
  }, []);

  useEffect(() => {
    if (amountDeposit?.check && amountDeposit?.amount > 0) {
      setValue("amount", amountDeposit?.amount);
    }
  }, [amountDeposit?.check]);

  const { t } = useTranslation();

  let priceValue=0;
  const priceCalculate = async (price) => {
    priceValue+=price;
    setValue("amount", priceValue);
  };

  const resetPrice = async () => {
   
    setValue("amount", "");
  };

  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isCopied]);
  const [minDeposit, setMinDeposit] = useState(100);
  const [maxDeposit, setMaxDeposit] = useState(25000);

  // useEffect(() => {
  //   if (!isEmpty(profileData) && profileData?.limitSetting.length > 0) {
  //     setMinDeposit(
  //       profileData?.limitSetting.length > 0 &&
  //         profileData?.limitSetting[0]?.minDeposit
  //     );
  //     setMaxDeposit(
  //       profileData?.limitSetting.length > 0 &&
  //         profileData?.limitSetting[0]?.maxDeposit
  //     );
  //   }
  // }, [
  //   !isEmpty(profileData) &&
  //     profileData?.limitSetting.length > 0 &&
  //     profileData?.limitSetting[0]?.minDeposit,
  // ]);
  return (
    <LayoutNew>
   <div className={downloadBar?"p-title title-box deposit-tab":"p-title title-box deposit-tab banner-bar-height"}>
        {/* <IoMdArrowBack onClick={() => navigate(-1)} size={30} /> */}
        <div class="title w-100">
        <div class="row hidden-md-and-up mobile-header no-gutters">
         
          <div class={location.pathname=="/deposit"?"text-center mobile-header-item col col-6 selected":"text-center mobile-header-item col col-6"}>
            <Link to="/deposit" class="router-link-exact-active " >
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
      <div class="main dw-p deposit-box page-content-box w-100 bg-gradual-black">
      <DesktopSidebar/>
      <div className="width70">
        <div class="walletInfo-wrapper w-100 common-box dw-box">
          <div class="tol-wal-bal-box">
            <div class="item">
              <span>{t("Total_Wallet_Balance")}</span>
              <br />
              <span class="amt">BDT {userCoins?.balance || 0}</span>
              <span class="tolWalBal amt">
                <div class="bal-loader">
                  <div class="spin-yellow spin">
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
            <div class="item walletBalance-outer border-t mt-2 pt-1">
              <span>
                {t("Main_Wallet")}: BDT{" "}
                <span className="walletBalance">{userCoins?.balance || 0}</span></span>
              <span onClick={() => navigate('/deposit-history')} className="walletBalance-button">Deposit transction history</span>
            </div>
          </div>
          
        </div>

        <div class="usrTrans-wrapper common-box form-f mb-66">
          <div class="withdraw-form usrTrans-form">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              id="deposit_form"
              class="deposit_form"
            >
              <div class="usrTrans-seperate">
                <div class="transaction-title">
                  <span>{t("Deposit_Type")}</span>
                  <span class="important-icon">*</span>
                </div>
                <div class="m-auto">
                  <select
                    {...register("depositType", {
                      required: {
                        value: true,
                        message: t("Select_Deposit_Type"),
                      },
                    })}
                    id="depositType"
                  >
                  <option value="">{t("Select_Deposit_Type")}</option>
                    <option value="online" security="true">
                      {t("Online_Transfer")}
                    </option>
                  </select>
                </div>
                {errors?.depositType?.message && (
                  <div class="transaction-errMsg text-danger depositMsg">
                    {errors?.depositType?.message}
                  </div>
                )}
              </div>
             
              <div class="member-menu-box member-list select-group checkbox-style ">
                <div class="title"><h2 ><span >Payment Method</span></h2></div>
                <ul class="col3 ">
                {bank?.length > 0 &&
                      bank?.map((res) => {
                        return (
                      <li onChange={() => getBankDetail(res?._id)}>
                      <input  type="radio" value={res?._id} {...register("bank")}/>
                      <label>
                        <div  class="bank">
                          <img  alt="bkash" src={res?.bank_name.toLowerCase().includes("bkash")? iconBkash
                          :res?.bank_name.toLowerCase().includes("nagad")?iconNagad
                          : res?.bank_name.toLowerCase().includes("rocket")?iconRocket
                          : res?.bank_name.toLowerCase().includes("eth")?iconEth
                          : res?.bank_name.toLowerCase().includes("btc")?iconBtc
                          : res?.bank_name.toLowerCase().includes("upay")?iconUpay
                          :iconTrc20
                        } />
                        </div>
                          <span >{res?.bank_name}</span>
                          <span  class="item-icon">  
                            <img  alt="bkash" src={selectCheck} />
                          </span>
                      </label>
                      </li>
                        )})}
                  
                  
                  </ul>
              </div>
               {!isEmpty(watch("bankAccount")) && (
                <>
                  <div class="usrTrans-seperate bankInfoField bankInfo">
                    <div class="transaction-title">
                      <span>{t("Account_Name")}</span>
                      <span class="copyBtn bg-gradient-secondary">
                        <i class="fas fa-copy"></i>
                      </span>
                    </div>
                    <div class="transaction-option m-auto">
                      <input
                      style={{color: `#fff`}}
                        {...register("accountName")}
                        class="text-input"
                        id="depositAccName"
                        disabled
                      />
                    </div>
                  </div>
 
                  <div class="usrTrans-seperate bankInfoField bankInfo" style={{ position:'relative',width:`100%`}}>
                    <div class="transaction-title">
                      <span>{t("Bank_Account")}</span>
                      <span class="copyBtn bg-gradient-secondary">
                        <i class="fas fa-copy"></i>
                      </span>
                    </div>
                    <div class="transaction-option m-auto">
                      <input
                      style={{color: `#fff`}}
                        {...register("bankAccount")}
                        disabled
                        class="text-input"
                        id="depositAccNo"
                      />
                      <div className="input-group-btn" style={{position:'absolute', right:'0', top:'-10', bottom:'0px', filter: `invert(1)`}}>
                      <span className="btn btn-outline-primary"  style={{backgroundColor:'transparent', border:'0',padding:'8px', paddingTop:'0px', height:'72%'}}>
                      <CopyToClipboard text={getValues("bankAccount")} onCopy={() => setCopied(true)}>
                                <Button className="copy-btn" style={{fontSize: `13px`,padding: `5px`,backgroundColor: `#005dac`,color: `#fff`}}>{isCopied ? "Copied!" : "Copy"}</Button>
                      </CopyToClipboard>
                      </span>
            </div>
                    </div>
                  </div>
                </>
               )} 
             
              <div  class="member-menu-box member-list select-group checkbox-style ">
                  <div class="title"><h2><span >{t("Amount")}</span>   <span class="important-icon">*</span><i >৳ {minDeposit} - ৳ {maxDeposit}</i></h2></div>
                  <div class="usrTrans-seperate deposit-amount">
                
                <div class="transaction-option m-auto">
                  <input
                    {...register("amount", {
                      required: {
                        value: true,
                        message: t("Please_enter_amount"),
                      },
                      validate: (value) => {
                        if (value > 0) {
                          if (Number(value) > Number(maxDeposit)) {
                            return "Amount should not be greater than "+maxDeposit;
                          } else if (Number(value)< Number(minDeposit)) {
                            return "Deposit Amount Should be greater than "+minDeposit;
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
              </div>
                  <div  class="active">
                      <ul class="col4">
                    {AmountArray?.map((item,key) => {
                          return (
                    <li onChange={() => priceCalculate(item?.amount)}><input  type="radio" name="depositAmount" /><label><span > {"+" +item?.amount} </span></label></li>
                    )})}
    
                      </ul>
                  </div>
                  <div class="input-group money">
                    <label  for="amount">৳</label>
                    <div  class="input-wrap ">
                      <input  type="text" class=" ng-untouched ng-pristine ng-valid" placeholder="0.00" disabled=""/>
                      <a  class="delete-btn red"  ></a>
                  </div>
                 </div>
              </div>

              <div class="usrTrans-seperate default-type">
                <div class="transaction-title">
                  <span>{t("Upload_Receipt")}</span>
                </div>
                <div class="transaction-option m-auto">
                  <div class="fileupload-box bg-gradient-secondary">
                    <span>{t("Select_an_Image")}</span>
                    <input
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                       
                      }}
                      type="file"
                      class="fileInput"
                      accept="image/png, image/jiffy, image/jpeg, image/jpg"
                      id="depositReceipt"
                      name="depositReceipt"
                    />
                  </div>
                  {image !== "" && (
                    <button
                      onClick={() => setImage("")}
                      class="btn-remove removeReceipt bg-gradient-third"
                    >
                      {t("Remove_Image")}
                    </button>
                  )}
                </div>
                
              </div>

              <div class="usrTrans-seperate default-type">
                <div class="transaction-title">
                  <span>{t("Transaction_ID")}</span>
                </div>
                <div class="transaction-option m-auto">
                  <input
                    {...register("transactionId", {
                      required: {
                        value: true,
                        message: t("enter_Transaction_ID"),
                      }
                      , pattern: {
                        value: validationRules.removeWhitespace,
                        message:"Please enter only number or character",
                      },
                      
                    })}
                    class="text-input"
                    id="depositReferId"
                  />
                </div>
                {errors?.transactionId?.message && (
                  <div class="transaction-errMsg text-danger depositMsg">
                    {errors?.transactionId?.message}
                  </div>
                )}
              </div> 
            
              <div class="usrTrans-seperate">
                <div class="transaction-option">
                  <div class="transaction-btn">
                   
                  
                    <button
                      type="submit" disabled={isLoader}
                      className="btn-submit bg-gradient-primary text-capitalize"
                    >
                      {isLoader ? "Loading..." :t("Submit")}
                   
                    </button>
                  </div>
                </div>
              </div>

              
            </Form>
          </div>
        </div>
        <div class="deposit-description">
                {/* <ReactPlayer
                  muted={false}
                  controls={false}
                  playsinline={true}
                  playing={false}
                  width="100%"
                  height="auto"
                  url={`https://www.youtube.com/shorts/tXqlo92O0ao`}
                  config={{
                    file: {
                      attributes: {
                        preload: "none",
                        //forceHLS: true,
                      },
                      hlsOptions: {
                        //autoStartLoad: false,
                        startLevel: 3,
                      },
                    },
                  }}
                /> */}
                {/* <div style={{ marginTop: "10px" }}>
                  <span>{t("DEPOSIT_LINE1")}</span>
                </div>
                <div>
                  <span>{t("DEPOSIT_LINE2")}</span>
                </div>
                <div>
                  <span>{t("DEPOSIT_LINE3")}</span>
                </div> */}
              </div>
          {/* <video src={depositvideo} loop autoPlay style={{height:`300px`,width:`100%`}}></video>  */}
            <div  class="tips-info note" >
              <h5 ><i  class="tips-icon " ></i>
              <span >
                Dear all member, to speed up your deposit process, kindly follow these steps :
                1.verify the phone number you used for deposit.
                2. Input the correct reference number.
                3. Process only selected amount.
                4. Attach the successful Slip.
                Reminder:
                Do not save the phone number displayed on 9wkt website on your device to avoid losing money.
            </span>
          </h5></div>
        <div class="usrTrans-wrapper"></div>
        </div>
      </div>
    </LayoutNew>
  );
};

export default Deposit;
