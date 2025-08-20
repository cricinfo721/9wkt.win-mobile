import React, { useContext, useEffect, useRef,useState } from "react";
import OtpInput from "react18-input-otp";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
const ConfirmPin = ({ show, handelClose, pin, setPin, onSubmit,isLoader }) => {
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
    <Modal centered show={show} onHide={handelClose} className="block-modal">
      <Modal.Body className="py-3">
        <div className="d-flex flex-column">
          <div className="otp-sent">
            <h3 style={{color:`#000`}}>Enter Password</h3>
          </div>
          <Form.Group className="mb-2">
                {/* <Form.Label> Password</Form.Label> */}
                    <div style={{ position:'relative',width:`100%`}}>
                    <Form.Control
                       type={passwordType ?passwordType:"password"}
                      placeholder="Enter Password"
                      onChange={(e) => {
                        setPin(e.target.value);
                      }}
                    />
                      <div className="input-group-btn" style={{position:'absolute', right:'0', top:'-10', bottom:'0px', filter: `invert(1)`}}>
                        <span className="btn btn-outline-primary" onClick={togglePassword} style={{backgroundColor:'transparent', border:'0',padding:'3px 8px 13px', height:'72%'}}>
                          {passwordType==="password"?<AiFillEyeInvisible/> :  <AiFillEye/>}
                        </span>
                      </div>
                    </div>
                    
              </Form.Group>
              
          {/* <div
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
          </div> */}
          <button
            disabled={isLoader}
            className="theme-btn-new"
            onClick={() => { onSubmit(); }}
          >
            {isLoader ? "Loading..." :"Submit"}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmPin;
