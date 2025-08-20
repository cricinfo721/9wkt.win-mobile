import React, { useContext, useState } from "react";
import verfifyImg from "../assets/images/otp-verify.webp";
import OtpInput from "react18-input-otp";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
const CreatePin = () => {
  const { otpVerify, createPinFunc, registerData, loginUser } =
    useContext(AuthContext);
  const [pin, setPin] = useState('');
  const { t } = useTranslation();
  return (
    <div>
      <div className="otp-verfication">
        <div className="text-center">
          <figure>
            <img src={verfifyImg} alt="" />
          </figure>
          <div>
            <h4>{t("Login_Pin")}</h4>
            <div className="otp-sent">
              {t("Enter_pin")}
              {registerData?.isVerified && !isEmpty(registerData?.username) ? (
                <strong>+{registerData?.username}</strong>
              ) : (
                <strong>
                  +{registerData?.countryCode} - {registerData?.mobile}
                </strong>
              )}
            </div>
            <div
            className="otpInput"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px 0px",
              }}
            >
              <OtpInput
                numInputs={6}
                value={pin}
                onChange={(e) => {
                  setPin(e);
                }}
                // isInputSecure={true}
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
            <button
              className="theme-btn-new"
              onClick={() => {
                if (pin?.toString().length == 6) {
                  if (
                    registerData?.isVerified &&
                    !isEmpty(registerData?.username)
                  ) {
                    loginUser({ pin: pin });
                  } else if (registerData?.alreadyRegistered) {
                    loginUser({ pin: pin });
                  } else {
                    createPinFunc({ pin: pin });
                  }
                } else {
                  toast.error("Please enter 6 digit pin");
                }
              }}
            >
              {t("Submit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
