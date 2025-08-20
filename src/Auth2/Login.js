import React, { useContext, useEffect, useRef,useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
// import bkashLogo from "../assets/images/logo-betwoin.png";
import rightArrow from "../assets/images/right-arrow.png";
import { Controller, useForm } from "react-hook-form";
import { Form, Button, InputGroup } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AuthContext from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import LoginSlider from "./LoginSlider";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

import { apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { pick, isEmpty } from "lodash";
import jwt_decode from "jwt-decode";
import welcomebn from "../assets/images/welcome-bn.mov";

const Login = () => {
  const { sendOTP,setBr, lang, setEn ,setUser,visiterId,setChatId} = useContext(AuthContext);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
    defaultValues: {
      countryCode: 91,
      uniqueId: Math.random() * 10000,
    },
  });
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isLoader, setLoader] = useState(false);
  let onSubmit = async (body) => {
    body.visiterId=visiterId||"";
    setLoader(true)
    const { status, data } = await apiPost(
      apiPath.loginUser,
      pick(body, ["username", "password","uniqueId","visiterId"])
    );
    if (status === 200) {
      if (data.success) {
        setChatId(data.results.platformType);
        localStorage.setItem("chatId", data.results.platformType);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 500);
        setLoader(false);
        localStorage.setItem("token", data.results?.token);
        localStorage.setItem("refresh_token", data.results?.refresh_token);
        setUser(jwt_decode(data?.results?.token));
        navigate("/");
        
      } else {
        setLoader(false);
        toast.error(data?.message);
       
      }
    } else {
      setLoader(false);
      toast.error(data?.message);
      
    }
  };
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

  return (
    <>
      <div className="">
        {/* <LoginSlider /> */}
        <div className="login-form active" >
        <div className="back-header menu-header">
          <div className="left-arrow">
          <span onClick={() => navigate("/")}>
            <img src={rightArrow} alt="" />
          </span>
          </div>
          <p>{t("Login")}</p>
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
        <div  class="sponsor-banner">
        {/* <video src={welcomebn} loop autoPlay muted style={{width:`100%`}}></video> */}
        {/* <img  alt="en-sponsor" src="../../assets/images/en-sponsor.jpg" loading="lazy"/> */}
          </div>
        <div className="reg-data">
        {/* <div className="reg-logo">
          <img src={bkashLogo} alt="" onClick={() => navigate("/")}/> 
          
        </div>  */}
       
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <Form.Group className="d-flex login-data-d">
                  <Form.Label>{t("Username")}</Form.Label>
                  <Form.Control
              type="text"
              
           
              {...register("username", {
                  required: "Please enter Username",
              })}
              placeholder="Please Enter Username"
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
                    />
                      <div className="input-group-btn" style={{position:'absolute', right:'0', top:'-10', bottom:'0px'}}>
                        <span className="btn btn-outline-primary" onClick={togglePassword} style={{backgroundColor:'transparent', border:'0',padding:'3px 3px 13px', height:'72%'}}>
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
            </div>
            <div  class="login-info-box">
            <div class="forgetpassword-buttn"><Link to="/forgot-password">Forgot password?</Link></div></div>

            <button type="submit" className="submit-btn" disabled={isLoader}>
              <span> {isLoader ? "Loading..." :t("Confirm")}</span>
            </button>
            <div className="term-condtion">
              <p>
                {t("Do_not_have_an_account")}
                <Link to="/register">{t("Sign_up")}</Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
      </div>
      
    </>
  );
};

export default Login;
