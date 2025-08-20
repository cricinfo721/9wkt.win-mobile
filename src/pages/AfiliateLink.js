import React, { useContext, useEffect, useRef, useState } from "react";
import LayoutNew from "../components/shared/LayoutNew";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, InputGroup } from "react-bootstrap";
import { preventMaxInput, validationRules,CountryFlagBanner } from "../Utils/constants";
import { isEmpty } from "lodash";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoMdArrowBack } from "react-icons/io";
import { apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "react-toastify";
import MainBanner from "./slider/MainBanner";
import FooterSection from "../components/FooterSection";
import Slider from "react-slick";

import AuthContext from "../context/AuthContext";
import iconanyjakson from "../assets/images/any_jackson.png";
import icon2 from "../assets/images/2_title_background.png";
import iconhansika from "../assets/images/hansika.png";


const AfiliateLink = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const inputRef = useRef(null);
  const { setAffiliate, affiliate } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [conPassToggle, setConPassTogle] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });
  useEffect(() => {
    if (!isEmpty(watch("confirmPassword"))) {
      if (watch("password")) {
        trigger("confirmPassword");
      }
    }
  }, [watch("password")]);
  const onSubmit = async (body) => {
    let hostname = window.location.hostname;
    hostname = hostname.replace(/^www\./, "");
    hostname = hostname.replace(/^ag\./, "");
    const { status, data } = await apiPost(apiPath.affiliate, {
      whatsappNumber: body?.mobile,
      username: body?.username,
      password: body?.password,
      confirmPassword: body?.confirmPassword,
      referral_code: body?.referral_code || "",
      website:hostname || "SABAEXCH"
    });
    if (status === 200) {
      if (data.success) {
        toast.success(data?.message);
        setAffiliate(data?.results?.adminuser?.referalCode);
        navigate(
          `/affilates?referral_code=${data?.results?.adminuser?.referalCode}`
        );
      } else {
        toast.error(data?.message);
      }
    } else {
      toast.error(data?.message);
    }
  };
  var settings = {
    
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: false,
    arrows: true,
    slidesToShow:3,
    slidesToScroll: 1,
  };
  useEffect(() => {
    if (!isEmpty(search)) {
      if (search?.split("=")[0] == "?referral_code") {
        setValue("referral_code", search?.split("=")[1]);
      }
    }
  }, [search]);
  return (
    <LayoutNew>
      <div className="top-class"> 
        <div class="p-title title-box">
          <IoMdArrowBack onClick={() => navigate(-1)} size={30} />
          <div class="title w-100">{t("Affiliate_Agent")}</div>
        </div>{" "}
        <section class="index_country" id="index_country">
        <div class="index_country row justify-content-center">
                <div class="col-lg-4 col-12 my-auto text-center index_title1">
                    <p>We’re More Than Just An</p>
                    <h3>Online Betting Site</h3>
                </div>
            </div>
            <Slider {...settings}>
        {CountryFlagBanner?.length > 0 &&
          CountryFlagBanner?.map((item) => {
            return (
              <>
              <div
                
                className="slider-items"
              >
                <figure className="mb-0">
                  <img src={item?.banner} alt="" />
                  
                </figure>
                
              </div>
              <p style={{color:`#fff`,textTransform:`uppercase`}}>{item?.title}</p></>
            );
          })}
      </Slider>
        <Form className="afilate-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <Form.Group className="form-group pb-1">
                <Form.Label className="mb-0">{t("Username")}</Form.Label>
                <Form.Control
                  className="p-1"
                  autoComplete={false}
                  {...register("username", {
                    required: {
                      value: true,
                      message: t("Please_enter_username"),
                    },
                  })}
                />
              </Form.Group>
              {errors?.username?.message && (
                <div className="text-danger">{errors?.username?.message}</div>
              )}
            </div>
            <div className="mb-3">
              <Form.Group className="form-group">
                <Form.Label>{t("WhatsApp_number")}</Form.Label>
                <Controller
                  className="form-group d-flex"
                  control={control}
                  name="mobile"
                  rules={{
                    required: t("enter_whatsApp_number"),
                    validate: (value) => {
                      let inputValue = value
                        ?.toString()
                        ?.slice(
                          inputRef?.current?.state?.selectedCountry?.countryCode
                            ?.length,
                          value?.length
                        );
                      if (inputValue?.length < 9) {
                        return t("contain_9_digit");
                      } else if (inputValue?.length > 10) {
                        return t("exceed_10_digit");
                      } else {
                        return true;
                      }
                    },
                  }}
                  render={({ field: { ref, ...field } }) => (
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
                        height: "38px",
                      }}
                      country={"bd"}
                      enableSearch
                      countryCodeEditable={false}
                    />
                  )}
                />
              </Form.Group>
              {errors?.mobile?.message && (
                <div className="text-danger">{errors?.mobile?.message}</div>
              )}
            </div>
            <div className="mb-3">
              <Form.Group>
                <Form.Label>{t("Password")}</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={!showPassword ? "password" : "text"}
                    placeholder={t("Enter_Password")}
                    maxLength={16}
                    onInput={(e) => preventMaxInput(e)}
                    {...register("password", {
                      required: t("Please_enter_password"),
                      validate: (value) => {
                        if (value === "") {
                          return true;
                        }
                        if (!!value.trim()) {
                          return true;
                        } else {
                          return t("White_spaces_not_allowed");
                        }
                      },
                      pattern: {
                        value: validationRules.newPass,
                        message: t("must_be_8_character_long_new"),
                      },
                      maxLength: {
                        value: 16,
                        message: t("Maximum_length_must_be_16"),
                      },
                    })}
                  />

                  <InputGroup.Text
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </InputGroup.Text>
                </InputGroup>
                {errors?.password?.message && (
                  <div className="text-danger">{errors?.password?.message}</div>
                )}
              </Form.Group>
            </div>
            <div className="mb-3">
              <Form.Group>
                <Form.Label>{t("Confirm_Password")}</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder={t("Enter_confirm_password")}
                    onInput={(e) => preventMaxInput(e)}
                    maxLength={16}
                    type={!conPassToggle ? "password" : "text"}
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: t("Please_enter_confirm_password"),
                      },
                      validate: (value) => {
                        if (value === "") {
                          return true;
                        }
                        if (!isEmpty(watch("password"))) {
                          if (value === watch("password")) {
                            return true;
                          } else {
                            return t("confirm_password_does_not_match")
                          }
                        }
                      },
                      maxLength: {
                        value: 16,
                        message: t("Maximum_length_must_be_16"),
                      },
                    })}
                    onChange={(e) => {
                      setValue("confirmPassword", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  <InputGroup.Text
                    onClick={() => setConPassTogle(!conPassToggle)}
                    style={{ cursor: "pointer" }}
                  >
                    {conPassToggle ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </InputGroup.Text>
                </InputGroup>
                {errors?.confirmPassword?.message && (
                  <div className="text-danger">
                    {errors?.confirmPassword?.message}
                  </div>
                )}
              </Form.Group>
            </div>
            <div className="mb-3">
              <Form.Group className="form-group pb-1">
                <Form.Label className="mb-0">
                  Referral Code (Optional)
                </Form.Label>
                <Form.Control
                  type="text"
                  className="p-1"
                  autoComplete={false}
                  {...register("referral_code")}
                />
              </Form.Group>
            </div>
            <div className="w-100">
              <Button
                style={{ background: "#14805e", border: "none" }}
                className="w-100"
                type="submit"
              >
                {t("Submit")}
              </Button>
            </div>
          </Form>
          <div class="col-lg-6 col-10 m-auto text-center affiliate-data">
            <div class="row justify-content-center index_title2"> 
                <div class="col-lg-6 col-6 text-left">
                    <h4 style={{color:`#fff`,marginBottom: `0`}}>ACTIVE AFFILIATES:</h4>
                </div>
                
                <div class="col-lg-5 col-6">
                    <h3 ><span id="statistic1">7,000</span> ++</h3>
                </div>
            </div>
            <br/>
            <div class="row justify-content-center index_title2"> 
                    <div class="col-lg-6 col-6 text-left " >
                    <h4 style={{color:`#fff`,marginBottom: `0`}}>MONTHLY PAYMENT FOR AFFILIATES:</h4>
                </div>
                
                <div class="col-lg-5 col-6">
                    <h3>$ <span id="statistic2">1,000,000</span> ++</h3>
                </div>
            </div>
            <br/>
            <div class="row justify-content-center index_title2"> 
                <div class="col-lg-6 col-6 text-left">
                    <h4 style={{color:`#fff`,marginBottom: `0`}}>ALL-TIME COMMISSION RELEASE:</h4>
                </div>
                
                <div class="col-lg-5 col-6">
                    <h3 >$ <span id="statistic3">15,000,000,000</span> ++</h3>
                </div>
            </div>
           

          </div>
          </section>

        <div className="main">
        
          
          <section class="index_brand" id="index_brand">
     <div class="index_brand-content">
      <div class="container-fluid h-100">
        <div class="row h-100 justify-content-center">
        <div class="col-lg-11 col-11 my-auto text-center">
            <h2>brand ambassadors</h2>
            {/* <div class="row justify-content-center" >
                <div class="col-lg-3 col-12">
                    <iframe src="https://www.youtube.com/embed/IM1Yfj40nzc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>
                    <br/><br/>
                    <img src={iconanyjakson} class="img-fluid"/>
                </div>
                <div class="col-lg-5 col-12"><img src={icon2} class="img-fluid"/>
                    
                </div>
                <div class="col-lg-3 col-12">
                    <div class=" d-block d-md-none">
                    <img src={iconhansika} class="img-fluid"/>
                    </div>
                    
                    <iframe src="https://www.youtube.com/embed/_cMF9hvXpeg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe><br/><br/>
                    
                </div>
            </div> */}
                
            <p>We're so excited to announce that Hansika Motwani, the famous Indian actress and Amy Jackson, the well-known British model-turned-actress, are now our brand ambassadors! These incredible individuals are the embodiment of our brand, and we're proud to have them represent us. We can’t wait to work out something fun and exciting for you guys! Stay connected with us for more thrilling updates!</p>
            </div>
            </div>
          </div>
         </div>
    </section>
          <FooterSection />
        </div>
      </div>
    </LayoutNew>
  );
};

export default AfiliateLink;
