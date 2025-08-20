import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import rightArrow from "../assets/images/right-arrow.png";
import { Controller, useForm } from "react-hook-form";
import { Form, Button, InputGroup } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AuthContext from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import LoginSlider from "./LoginSlider";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "react-toastify";
import LayoutNew from "../components/shared/LayoutNew";

const ChangePassword = () => {
    const { sendOTP, setBr, lang, setEn,logoutUser } = useContext(AuthContext);
    const { t } = useTranslation();


    const {
        register,
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
        },
    });
    const navigate = useNavigate();
    const onSubmit = async (body) => {
        set_password_same(true);
        if (body.password !== body.confirmPassword) {
          set_password_same(false);
        } else {
        const obj = {
          oldPassword: body?.oldpassword,
          newPassword: body?.confirmPassword,
        };
        const { status, data } = await apiPost(apiPath.changePassword, obj);
        if (status === 200) {
          if (data.success) {
            logoutUser();
            toast.success(data?.message);
          } else {
            toast.error(data?.message);
          }
        } else {
            toast.error(data?.message);
        }
    }
      };

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
        <LayoutNew>
            <div className="register-content">


                <div className="login-form active" >
                    <div className="forgot-back-header menu-header">
                        <div className="left-arrow">
                            <span onClick={() => navigate("/")}>
                                <img src={rightArrow} alt="" />
                            </span>
                        </div>
                        <p>{t("Change_Password")}</p>

                    </div>
                    <div className="reg-data">
                        
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-2">
                            <Form.Group className="d-flex login-data-d">
                                    <Form.Label>Old Password</Form.Label>
                                    <div style={{ position: 'relative', width: `100%` }}>
                                        <Form.Control
                                            type={passwordType ? passwordType : "password"}
                                            placeholder="Enter Old Password"
                                            className={errors.oldpassword ? " is-invalid " : ""}
                                            {...register("oldpassword", {
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


                                        <div className="input-group-btn" style={{ position: 'absolute', right: '0', top: '-10', bottom: '0px' }}>
                                            <span className="btn btn-outline-primary" onClick={togglePassword} style={{ backgroundColor: 'transparent', border: '0', padding: '8px', paddingTop: '3px', height: '72%' }}>
                                                {passwordType === "password" ? <AiFillEyeInvisible /> : <AiFillEye />}
                                            </span>
                                        </div>
                                    </div>

                                </Form.Group>
                                {errors.oldpassword && errors.oldpassword.message && (
                                    <div className="text-danger">
                                        {errors.oldpassword.message}
                                    </div>
                                )}
                                <Form.Group className="d-flex login-data-d">
                                    <Form.Label> Password</Form.Label>
                                    <div style={{ position: 'relative', width: `100%` }}>
                                        <Form.Control
                                            type={passwordType ? passwordType : "password"}
                                            placeholder="Enter Password"
                                            className={errors.password ? " is-invalid " : ""}
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


                                        <div className="input-group-btn" style={{ position: 'absolute', right: '0', top: '-10', bottom: '0px',  }}>
                                            <span className="btn btn-outline-primary" onClick={togglePassword} style={{ backgroundColor: 'transparent', border: '0', padding: '8px', paddingTop: '3px', height: '72%' }}>
                                                {passwordType === "password" ? <AiFillEyeInvisible /> : <AiFillEye />}
                                            </span>
                                        </div>
                                    </div>

                                </Form.Group>
                                {errors.password && errors.password.message && (
                                    <div className="text-danger">
                                        {errors.password.message}
                                    </div>
                                )}
                                <Form.Group className="d-flex login-data-d">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <div style={{ position: 'relative', width: `100%` }}>
                                        <Form.Control
                                            type={passwordType ? passwordType : "password"}
                                            placeholder="Confirm Password"
                                            className={errors.confirmPassword ? " is-invalid " : ""}
                                            {...register("confirmPassword", {
                                                required: "Please enter confirm password",
                                            })}
                                        />


                                        <div className="input-group-btn" style={{ position: 'absolute', right: '0', top: '-10', bottom: '0px' }}>
                                            <span className="btn btn-outline-primary" onClick={togglePassword} style={{ backgroundColor: 'transparent', border: '0', padding: '8px', paddingTop: '3px', height: '72%' }}>
                                                {passwordType === "password" ? <AiFillEyeInvisible /> : <AiFillEye />}
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
                            </div>



                            <button type="submit" className="submit-btn">
                                <span>{t("Confirm")}</span>
                            </button>

                        </Form>
                    </div>
                </div>


            </div>
            </LayoutNew>
        </>
    );
};

export default ChangePassword;
