import React, { useContext, useEffect, useRef, useState } from "react";
import LayoutNew from "../components/shared/LayoutNew";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, InputGroup } from "react-bootstrap";
import { preventMaxInput, validationRules } from "../Utils/constants";
import _, { isEmpty } from "lodash";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoMdArrowBack } from "react-icons/io";
import { apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "react-toastify";
import Slider from "react-slick";
import logo from "../assets/images/Bangladesh.png";
import india from "../assets/images/India.png";
import pak from "../assets/images/pak.png";
import com from "../assets/images/Cambodia.png";
import AuthContext from "../context/AuthContext";
import left from "../assets/images/left.png";
import right from "../assets/images/right.png";
import CountUp from "react-countup";
const Afiliates = () => {
  // const { sendOTP, setBr, lang, setEn } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { search } = useLocation();
  const { affiliate } = useContext(AuthContext);
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
    const { status, data } = await apiPost(apiPath.sendOTP, {});
    if (status === 200) {
      if (data.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } else {
      toast.error(data?.message);
    }
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "center",
    centerMode: false,
    prevArrow: <img src={left} />,
    nextArrow: <img src={right} />,
  };
  const data = [
    { img: logo, text: "Bangladesh" },
    { img: india, text: "India" },
    { img: pak, text: "Pakistan" },
    { img: com, text: "Cambodia" },
  ];
  function copy(text) {
    toast.success("Link Copied!");
    return window.navigator.clipboard.writeText(text);
  }
  return (
    <LayoutNew>
      <div className="main main-new affilates-page">
        <div class="p-title title-box">
          <IoMdArrowBack onClick={() => navigate(-1)} size={30} />
          <div class="title w-100">{t("Affiliates")}</div>
        </div>

        <div class="row bg1">
          <div className="referal_liks_top">
            <p>
              {t("Link_for_login")} -{" "}
              <a
                target="_blank"
                href="https://ag.9wkt.win/ "
                style={{ color: "lightblue" }}
              >
                https://ag.9wkt.win/{" "}
              </a>
            </p>
            <p>
              {t("Link_to_refer")} -{" "}
              <span
                onClick={() => {
                  copy(`${window.location.origin}/login${search}`);
                }}
                style={{ color: "lightblue" }}
              >{`${window.location.origin}/login${search}`}</span>
            </p>
          </div>
          <div class="col-lg-7 col-12 m-auto text-center index_title1 mt-4">
            <p>{t("We_More_Than_Just_An")}</p>
            <h3>{t("Online_Betting_Site")}</h3>
          </div>
          <div class="col-lg-7 mt-2 col-12 m-auto text-center index_title1 afilate-slider">
            <Slider {...settings}>
              {data?.map((item) => {
                return (
                  <div className="affilate-slider">
                    <figure className="mb-0">
                      <img src={item?.img} alt="" />
                    </figure>
                    <p>{item?.text}</p>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div class="col-lg-7 col-12 m-auto text-center index_title1 mt-4 px-4">
            <div class="row justify-content-center index_title2 mb-3 mx-0">
              <div class="col-lg-6 col-6 text-left">
                <h4 className="afi-text">{t("ACTIVE_AFFILIATE")}:</h4>
              </div>
              <div class="col-lg-5 col-6">
                <h3 className="afi-text1">
                  <span id="statistic1">
                    <CountUp
                      start={0}
                      end={_.random(150, 250)}
                      duration={3}
                      separator=","
                      decimals={2}
                      decimal="."
                    />
                  </span>{" "}
                  ++
                </h3>
              </div>
            </div>
            <div class="row justify-content-center index_title2 mb-3 mx-0">
              <div class="col-lg-6 col-6 text-left">
                <h4 className="afi-text">{t("ACTIVE_AGENT")}:</h4>
              </div>
              <div class="col-lg-5 col-6">
                <h3 className="afi-text1">
                  <span id="statistic1">
                    <CountUp
                      start={0}
                      end={_.random(200, 450)}
                      duration={3}
                      separator=","
                      decimals={2}
                      decimal="."
                    />
                  </span>{" "}
                  ++
                </h3>
              </div>
            </div>
            <div class="row justify-content-center index_title2 mb-3 mx-0">
              <div class="col-lg-6 col-6 text-left">
                <h4 className="afi-text">{t("ACTIVE_USER")}:</h4>
              </div>
              <div class="col-lg-5 col-6">
                <h3 className="afi-text1">
                  <span id="statistic1">
                    <CountUp
                      start={0}
                      end={_.random(6000, 25000)}
                      duration={3}
                      separator=","
                      decimals={2}
                      decimal="."
                    />
                  </span>{" "}
                  ++
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="row h-100 justify-content-center bg2">
          <div class="col-lg-11 col-11 my-auto text-center">
            <h2>{t("Brand_ambassadors")}</h2>
            <div class="row justify-content-center">
              <div class="col-lg-3 col-12">
                <iframe
                  src="https://www.youtube.com/embed/IM1Yfj40nzc"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen=""
                ></iframe>

                <img
                  src="https://bjaffiliates.com/img/country_option/any_jackson.png"
                  class="img-fluid"
                />
              </div>
              <div class="col-lg-5 col-12">
                <img
                  src="https://bjaffiliates.com/img/country_option/2_title_background.png"
                  class="img-fluid"
                />
              </div>
              <div class="col-lg-3 col-12">
                <div class=" d-block d-md-none">
                  <img
                    src="https://bjaffiliates.com/img/country_option/hansika.png"
                    class="img-fluid"
                  />
                </div>

                <iframe
                  src="https://www.youtube.com/embed/_cMF9hvXpeg"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen=""
                ></iframe>
                <div class=" d-none d-md-block">
                  <img
                    src="https://bjaffiliates.com/img/country_option/hansika.png"
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>

            <p>{t("AFFILIATE_BOTTOM")}</p>
          </div>
        </div> */}
        <section class="row index_exhibitor">
          <div class="col-lg-10 col-11 m-auto text-center">
            <h1>{t("EVENT_EXHIBITOR")}</h1>
            {/* <iframe
              src="https://www.youtube.com/embed/2R2DP6KCpFk?si=M3JN7rhOq85UiBVd"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen=""
            ></iframe> */}
            <p>{t("AFFILIATE_BOTTOM_2")}</p>
            <a
              class="btn btn_index"
              href="https://www.sportsbettingevents.com/spice-sri-lanka-sponsors"
            >
              {t("FIND_OUT_MORE")}
            </a>
          </div>
        </section>
      </div>
    </LayoutNew>
  );
};

export default Afiliates;
