import React, { useContext, useEffect, useRef,useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import bkashLogo from "../assets/images/logo.png";
import rightArrow from "../assets/images/right-arrow.png";
import { Controller, useForm } from "react-hook-form";
import { Form, Button, InputGroup } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AuthContext from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import MainBanner from "../pages/slider/MainBanner";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { pick, isEmpty } from "lodash";
import jwt_decode from "jwt-decode";
import welcomebn from "../assets/images/welcome-bn.mov";

const Registration = () => {
  const { sendOTP, setBr, lang, setEn ,setUser,visiterId} = useContext(AuthContext);
  
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const {
    register,
    unregister,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
    defaultValues: {
      countryCode: 91,
      uniqueId: Math.random() * 10000,
    },
  });


  const [isLoader, setLoader] = useState(false);


  const onSubmit = async (body) => {
    //  if (parseInt(body.validateCode) === parseInt(getValidateCode)) {
    setLoader(true);
    // console.log("body",body)
    set_password_same(true);
    if (body.password !== body.confirmPassword) {
      set_password_same(false);
    } else {
    try {
      
      const { status, data: response_users1 } = await apiPost(
         apiPath.registerUser,
          {
            username:body?.username,
            password:body?.password,
            phone_number: body?.mobile?.substring(inputRef?.current?.state.selectedCountry?.countryCode?.length,
              body?.mobile?.toString()?.length
            ),
            country_code: inputRef?.current?.state.selectedCountry?.countryCode,
            refreralCode: body?.refreralCode || "",
            uniqueId:body?.uniqueId,
            visiterId:visiterId||"",
          }
      );
      if (status === 200) {
        
        if (response_users1.success) {
          setLoader(false);
         
          localStorage.setItem("token", response_users1.results?.token);
          localStorage.setItem("refresh_token", response_users1.results?.refresh_token);
        //  console.log(response_users1?.results?.userData);
        //  setUser(jwt_decode(response_users1?.results?.token));
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 500);
        } else {
          setLoader(false);
          toast.error(response_users1?.message);
        }
      } else {
        setLoader(false);
        toast.error(response_users1?.message);
      }
    } catch (err) {
      setLoader(false);
      
    }
  }
//  }
  };
  const { search } = useLocation();
  let code=search?.split("=")[1]
  let  codeCondition=search?.split("=")?.includes("?referral_code") ? true : false
        
  useEffect(() => {
    if (codeCondition) {
      setValue("refreralCode", code);
    }
  }, [code, codeCondition]);


  const [passwordType, setPasswordType] = useState("password");
  const togglePassword =(e)=>{
    e.preventDefault()
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  const [password_same, set_password_same] = useState();

  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");

  const [getValidateCode, setValidateCode] = useState("");

  // const canvasRef = useRef(null);
  // const changeCode = () => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   context.font = "bold 120px sans-serif";
  //   const code = Math.floor(1000 + Math.random() * 9000);
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   context.fillText(code, 0, 130);
  //   setValidateCode(code);
  // };
  // useEffect(() => {
  //   changeCode();
    
  // }, []);

  return (
    
    <div
      className="registration-form active" 
    >
       
      <div className="back-header menu-header">
        <div className="left-arrow">
          <span onClick={() => navigate("/")}>
            <img src={rightArrow} alt="" />
          </span>
        </div>
        <p>Sign Up</p>
        {/* <div
          className="button"
          onClick={() => {
            if (lang == "bn") {
              setEn();
            } else {
              setBr();
            }
          }}
        >
          {lang == "bn" ? "English" : "Bangla"}
        </div> */}
      </div>
      {/* <MainBanner /> */}
      <div  class="sponsor-banner">
            {/* <img  alt="en-sponsor" src="../../assets/images/en-sponsor.jpg" loading="lazy"/> */}
             {/* <video src={welcomebn} loop autoPlay muted style={{width:`100%`}}></video> */}
          </div>
      <div className="reg-data">
        {/* <div className="reg-logo">
          <img src={bkashLogo} alt="" onClick={() => navigate("/")}/>
        </div> */}
        {/* <h2>
          {t("Enter_mobile")} <br />
          <strong>{t("Login_Registration")}</strong>
        </h2> */}
        <Form onSubmit={handleSubmit(onSubmit)}>
     <div> 
      
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
            <div className="text-danger">
              {errors.username.message}
            </div>
          )}
      <Form.Group className="d-flex login-data-d">
        <Form.Label> Password</Form.Label>
          <div style={{ position:'relative',width:`100%`}}>
          <Form.Control
                      type={passwordType ?passwordType:"password"}
                      placeholder="Enter Password"
                     
                      {...register("password", {
                        required: "Please enter password",
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
                   
          
            <div className="input-group-btn" style={{position:'absolute', right:'0', top:'-10', bottom:'0px'}}>
              <span className="btn btn-outline-primary" onClick={togglePassword} style={{backgroundColor:'transparent', border:'0',padding:'17px', paddingTop:'3px', height:'72%'}}>
                {passwordType==="password"?<AiFillEyeInvisible/> :  <AiFillEye/>}
              </span>
            </div>
          </div>
          
      </Form.Group>
      {errors.password && errors.password.message && (
                      <div className="text-danger">
                        {errors.password.message}
                      </div>
                    )}
      <Form.Group className="d-flex  login-data-d">
        <Form.Label>Confirm Password</Form.Label>
          <div style={{ position:'relative' ,width:`100%`}}>
          <Form.Control
                       type={passwordType ?passwordType:"password"}
                      placeholder="Confirm Password"
                      
                      {...register("confirmPassword", {
                        required: "Please enter confirm password",
                      })}
                    />
                    
              
              <div className="input-group-btn" style={{position:'absolute', right:'0', top:'-10', bottom:'0px'}}>
                <span className="btn btn-outline-primary" onClick={togglePassword} style={{backgroundColor:'transparent', border:'0',padding:'17px', paddingTop:'3px', height:'72%'}}>
                    {passwordType==="password"?<AiFillEyeInvisible/> :  <AiFillEye/>}
                </span>
              </div>
            </div>
           

            </Form.Group>
            {errors.confirmPassword &&
                      errors.confirmPassword.message && (
                        <div className="text-danger">
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    {password_same === false &&
                      errors.confirmPassword !== "" && (
                        <div className="text-danger">
                          Password does not match.
                        </div>
                      )}
                      {/* <Form.Group className="d-flex login-data-d">
        <Form.Label>{t("Currency")}</Form.Label>
          <Form.Control
              type="text"
              autocomplete="off"
            
              value={"BDT"}
             style={{color:'green'}}
             
          />
           
      </Form.Group>*/}
      <Form.Group className="d-flex login-data-d">
        <Form.Label>{t("Fullname")}</Form.Label>
          <Form.Control
              type="text"
              autocomplete="off"
             
              {...register("fullname", {
                  required: "Please enter fullname",
                  minLength: {
                    value: 4,
                    message:
                      "fullname should contain atleast 8 characters",
                  },
                  maxLength: {
                    value: 15,
                    message:
                      "fullname should contain maximum 16 characters",
                  },
              })}
              placeholder="4-15 char, allow numbers, no space"
          />
          
      </Form.Group>
      {errors.fullname && errors.fullname?.message && (
            <div className="text-danger">
              {errors.fullname.message}
            </div>
          )}
          <Form.Group className="form-group d-flex login-data-d">
            <Form.Label>{t("Mobile_Number")}</Form.Label>
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
          {errors?.mobile?.message && (
            <div className="text-danger">{errors?.mobile?.message}</div>
          )}
        </div>
        {/* <Form.Group className="d-flex login-data-d">
        <Form.Label>{t("Email")}</Form.Label>
          <Form.Control
              type="text"
              autocomplete="off"
             
              {...register("email")}
              placeholder="Email Address"
          />
          
      </Form.Group>
       */}
       
          <Form.Group className="form-group d-flex login-data-d">
            <Form.Label className="">{t("Referral")}</Form.Label>
            <Form.Control className="p-1" {...register("refreralCode")} placeholder="if you have" />
          </Form.Group>
          {errors?.refreralCode?.message && (
            <div className="text-danger">{errors?.refreralCode?.message}</div>
          )}
        
         {/* <dd id="validCodeErrorClass" style={{ display: "block",marginTop: `1px`,
    padding: `0` }} className="d-flex  login-data-d">
        <Form.Group className="form-group d-flex login-data-d">
        <Form.Label className="">{"Verification code"}</Form.Label>
              <input
                type="number"
                keyboardType="numeric"
                autocomplete="off"
                maxLength="4"
                className={"form-control"}
                {...register("validateCode", {
                  required: "Please enter validate code",
                  validate: {
                    validate: (value) =>
                      parseInt(value) === parseInt(getValidateCode) ||
                      "Invalid validate code",
                  },
                })}
                onChange={(e) => {
                  if (e.target.value.length == 4) {
                    e.target.blur();
                    unregister("validateCode", { keepValue: true });
                  }
                }}
                
                id="validCode"
                placeholder="Validation Code"
             
              />
             
              <canvas
                ref={canvasRef}
                onClick={changeCode}
                className="inputcanvas"
                id="authenticateImage"
              />
</Form.Group>
              
            </dd>
            {errors.validateCode && errors.validateCode.message && (
                <label className="text-danger text-left">
                  {errors.validateCode.message}
                </label>
              )}  */}
            <button type="submit" className="submit-btn"  disabled={isLoader?"disabled":""}>
              <span>  {isLoader ? "Loading..." : t("Confirm")}</span>
             
            </button>
          
        <div className="term-condtion">
          <p>
            {t("By_proceeding")}
            <Link to="">{t("Terms_Conditions")}</Link>
          </p>
        </div>
        
      </Form>
      </div>
      
      
    </div>
  );
};

export default Registration;
