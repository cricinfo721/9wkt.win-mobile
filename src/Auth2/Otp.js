import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import verfifyImg from "../assets/images/otp-verify.webp";
import AuthContext from "../context/AuthContext";
import OtpInput from "react18-input-otp";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const Otp = () => {
  const { otpVerify, registerData, sendOTP } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    setOtp(registerData?.otp);
  }, [registerData]);
  return (
    <div>
      <div className="otp-verfication">
        <div className="text-center">
          <figure>
            <img src={verfifyImg} alt="" />
          </figure>
          <div>
            <h4>{t("OTP_Verfication")}</h4>
            <div className="otp-sent">
              {t("Enter_OTP")}
              <strong>
                +{registerData?.countryCode} - {registerData?.mobile}
              </strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px 0px",
              }}
            >
              <OtpInput
                numInputs={4}
                value={otp}
                onChange={(e) => {
                  setOtp(e);
                }}
                isInputNum={true}
                shouldAutoFocus={true}
                inputStyle={{
                  width: "88%",
                  height: "52px",
                  borderRadius: "7px",
                  border: "1px solid #ced4da",
                }}
                separator={<span> </span>}
              />
            </div>
            <div className="resent-otp">
              {t("Dont_OTP")}
              <span onClick={() => sendOTP(registerData, "resend")}>
                {t("RESEND_OTP")}
              </span>
            </div>

            <button
              className="theme-btn-new"
              onClick={() => {
                if (otp?.toString()?.length == 4) {
                  otpVerify(otp);
                } else {
                  toast.error("Please enter 4 digit OTP");
                }
              }}
            >
              {t("VERIFY_PROCEED")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
