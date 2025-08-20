import React, { useContext, useEffect, useRef, useState } from "react";
import LoginSlider from "./LoginSlider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Registration from "./Registration";
import AuthContext from "../context/AuthContext";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import bkashLogo from "../assets/images/logo.png";
import rightArrow from "../assets/images/right-arrow.png";
import { Form } from "react-bootstrap";
import { apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "react-toastify";
import OtpInput from "react18-input-otp";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleShow = () => {
    navigate("/login");
  };
  const { t } = useTranslation();
  const { search } = useLocation();

  const { setBr, lang, setEn } = useContext(AuthContext);
  const inputRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
    defaultValues: {
      countryCode: 91,
    },
  });
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  const sendOTP = async (body) => {
    let obj = {
      phone_number: body?.mobile?.substring(
        inputRef?.current?.state.selectedCountry?.countryCode?.length,
        body?.mobile?.toString()?.length
      ),
      country_code: inputRef?.current?.state.selectedCountry?.countryCode,
      type: "forgot",
      username:body?.username
    };
    const { data: response_data } = await apiPost(apiPath.sendOTP, obj);
    if (response_data?.success) {
      if (response_data?.results?.alreadyRegistered == 1) {
        setData(obj);
        setStep(2);
        setCounterStart(true);
      } else {
        toast.error("Invalid Account!");
      }
    } else {
      toast.error(response_data?.message);
    }
  };
  const resendOTP = async () => {
    const { data: response_data } = await apiPost(apiPath.sendOTP, data);
    if (response_data?.success) {
      toast.success("Resend OTP");
    } else {
      toast.error(response_data?.message);
    }
  };
  const onVerfiyOTP = async (body) => {
    const { data: response_data } = await apiPost(apiPath.forgotVerifyOTP, {
      ...data,
      otp: body.otp,
    });
    if (response_data?.success) {
      toast.success(response_data?.message);
      setData({ ...data, otp: body?.otp });
      setStep(3);
    } else {
      toast.error(response_data?.message);
    }
  };
  const onSubmitOTP = async (body) => {
    set_password_same(true);
    if (body.pin !== body.confirmPin) {
      set_password_same(false);
    } else {
    const { data: response_data } = await apiPost(apiPath.forgotPassword, {
      ...data,
      pin: body?.pin,
      otp: body.otp,
    });
    if (response_data?.success) {
      toast.success(response_data?.message);
      navigate("/login");
    } else {
      toast.error(response_data?.message);
    }
  }
  };

  useEffect(() => {
    if (!isEmpty(watch("confirmPin"))) {
      if (watch("pin")) {
        trigger("confirmPin");
      }
    }
  }, [watch("pin")]);

  const [counter, setCounter] = useState(59);
  const [counterStart, setCounterStart] = useState(false);
  useEffect(() => {
    if (counterStart) {
      if (counter == 0) {
        setCounterStart(false);
      }
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [counter, counterStart]);
const [passwordType, setPasswordType] = useState("password");
    const togglePassword = (e) => {
        e.preventDefault()
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const [password_same, set_password_same] = useState();

    const newPassword = useRef({});
    newPassword.current = watch("newPassword", "");
  return (
    <>
      <div className="register-content">
     
      {step == 1 && (
        <div className="login-form active" >
        <div className="forgot-back-header menu-header">
          <div className="left-arrow">
            <span onClick={() => navigate("/")}>
              <img src={rightArrow} alt="" />
            </span>
          </div>
          <p>{t("Forgot_Password")}</p>
          
        </div>
        <div className="reg-data">
            

          <Form onSubmit={handleSubmit(sendOTP)}>
            <div className="mb-2">
              <Form.Group className="d-flex login-data-d">
                  <Form.Label>{t("Username")}</Form.Label>
                  <Form.Control
                          type="text"
                          autocomplete="off"
                         
                          {...register("username", {
                              required: "Please enter Username",
                              minLength: {
                                value: 4,
                                message:
                                  "Password should contain atleast 8 characters",
                              },
                              maxLength: {
                                value: 15,
                                message:
                                  "Password should contain maximum 16 characters",
                              },
                          })}
                          placeholder="4-15 char, allow numbers, no space"
                      />
                 
                </Form.Group>
                {errors.username && errors.username?.message && (
                    <label className="invalid-feedback text-left">
                      {errors.username.message}
                    </label>
                  )}
              <Form.Group className="d-flex login-data-d">
                <Form.Label> Mobile Number</Form.Label>
                    <div style={{ position:'relative',width:`100%`}}>
                    <Controller
                className="form-group d-flex"
                control={control}
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
                    if (inputValue?.length < 8) {
                      return "Mobile number must contain 8 digit";
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
                      inputExtraProps={{
                        ref,
                        required: true,
                        autoFocus: true,
                      }}
                      ref={inputRef}
                      inputStyle={{
                        width: "100%",
                        height: "12vw",
                      }}
                      country={"bd"}
                      enableSearch
                      countryCodeEditable={false}
                      disableDropdown={false}
                    />
                  </>
                )}
              />
                    
                    </div>
                   
              </Form.Group>
              {errors?.mobile?.message && (
              <div className="text-danger">{errors?.mobile?.message}</div>
            )}
            </div>
           
           

            <button type="submit" className="submit-btn">
              <span>{t("Next")}</span>
            </button>
           
          </Form>
        </div>
      </div>
      )}
      {step == 2 && (
      <div className="login-form active" >
        <div className="forgot-back-header menu-header">
          <div className="left-arrow">
            <span onClick={() => navigate("/")}>
              <img src={rightArrow} alt="" />
            </span>
          </div>
          <p>{t("Forgot_Password")}</p>
          
        </div>
        <div className="reg-data">
        
          <Form  onSubmit={handleSubmit(onSubmitOTP)}>
            <div className="mb-2">

            <Form.Group className="form-group mb-2">
              <Form.Label className="form-group-forgot mb-3">
                 OTP{" "}
                <button
               className="resendotpbtn"
                  onClick={() => {
                    if (counter === 0) {
                      setCounter(59);
                      resendOTP();
                    }
                  }}
                  disabled={counter !== 0}
                >
                  Resend OTP {counter !== 0 && `in ${counter} seconds`}
                </button>
              </Form.Label>
              <Controller
                className="form-group d-flex"
                style={{ border: "none" }}
                control={control}
                name="otp"
                rules={{
                  required: "Please enter 4 digit OTP",
                  validate: (value) => {
                    if (value?.toString()?.length == 4) {
                      return true;
                    } else {
                      return "Please enter 4 digit OTP";
                    }
                  },
                }}
                render={({ field: { ref, ...field } }) => (
                  <>
                    <OtpInput
                      {...field}
                      numInputs={4}
                      isInputNum={true}
                      inputExtraProps={{
                        ref,
                        required: true,
                        autoFocus: true,
                      }}
                      shouldAutoFocus={true}
                      inputStyle={{
                        width: "88%",
                        height: "52px",
                        borderRadius: "7px",
                        border: "1px solid #ced4da",
                      }}
                      separator={<span> </span>}
                    />
                  </>
                )}
              />
              {errors?.otp?.message && (
                <div className="text-danger" style={{ marginTop: "5px" }}>
                  {errors?.otp?.message}
                </div>
              )}
            </Form.Group>
                {errors.username && errors.username?.message && (
                    <label className="invalid-feedback text-left">
                      {errors.username.message}
                    </label>
                  )}
              <Form.Group className="d-flex login-data-d">
                  <Form.Label>{t("Password")}</Form.Label>
                  <div style={{ position: 'relative', width: `100%` }}>
                                                    <Form.Control
                                                        type={passwordType ? passwordType : "password"}
                                                        placeholder="Enter Old Password"
                                                        className={errors.pin ? " is-invalid " : ""}
                                                        {...register("pin", {
                                                            required: "Please enter old password",
                                                            minLength: {
                                                                value: 8,
                                                                message:
                                                                    "Password should contain atleast 8 characters",
                                                            },
                                                            maxLength: {
                                                                value: 16,
                                                                message:
                                                                    "Password should contain maximum 16 characters",
                                                            },
            
                                                        })}
                                                    />
            
            
                                                    <div className="input-group-btn" style={{ position: 'absolute', right: '0', top: '23px', bottom: '0px' }}>
                                                        <span className="btn btn-outline-primary" onClick={togglePassword} style={{ backgroundColor: 'transparent', border: '0', padding: '8px', paddingTop: '3px', height: '72%' }}>
                                                            {passwordType === "password" ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                        </span>
                                                    </div>
                                                </div>
            
                                               
                 
                </Form.Group>
                {errors.pin && errors.pin.message && (
                                    <div className="text-danger">
                                        {errors.pin.message}
                                    </div>
                                )}
               <Form.Group className="form-group d-flex login-data-d">
            <Form.Label>{t("Confirm_Password")}</Form.Label>
            <div style={{ position: 'relative', width: `100%` }}>
                                                    <Form.Control
                                                        type={passwordType ? passwordType : "password"}
                                                        placeholder="Confirm Password"
                                                        className={errors.confirmPin ? " is-invalid " : ""}
                                                        {...register("confirmPin", {
                                                            required: "Please enter confirm password",
                                                        })}
                                                    />
            
            
                                                    <div className="input-group-btn" style={{ position: 'absolute', right: '0', top: '23px', bottom: '0px' }}>
                                                        <span className="btn btn-outline-primary" onClick={togglePassword} style={{ backgroundColor: 'transparent', border: '0', padding: '8px', paddingTop: '3px', height: '72%' }}>
                                                            {passwordType === "password" ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                        </span>
                                                    </div>
                                                </div>
                                              
          </Form.Group>
          {errors.confirmPin &&
                                    errors.confirmPin.message && (
                                        <div className="text-danger">
                                            {errors.confirmPin.message}
                                        </div>
                                    )}
                                {password_same === false &&
                                    errors.confirmPin !== "" && (
                                        <div className="text-danger">
                                            Password does not match.
                                        </div>
                                    )}
            </div>
           
           

            <button type="submit" className="submit-btn">
              <span>{t("Confirm")}</span>
            </button>
           
          </Form>
        </div>
      </div>

  )}

      </div>
      
    </>
  );
};

export default ForgotPassword;
