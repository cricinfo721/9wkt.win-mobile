import React, { useContext, useState ,useRef,useEffect} from "react";
import { Form,Button, Table, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import SidebarLayout from "../components/shared/SidebarLayout";
import { useTranslation } from "react-i18next";
import { apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import PhoneInput from "react-phone-input-2";
import { Controller, useForm } from "react-hook-form";
const Profile = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  let { user, getProfileData,profileData,sendMobileOTP, setSeconds,
    setMinutes,seconds,minutes,getSendOtpStatus,setSendOtpStatus } = useContext(AuthContext);
  const { t } = useTranslation();
  const [edit, setEdit] = useState({});
  const [verifyEdit, setVerifyEdit] = useState({});
  const [verify, setVerify] = useState({});
  const [getMobileNumber, setMobileNumber] = useState({});
  console.log(getMobileNumber);
  const handleCloseVerify= () => {
    setVerifyEdit({ status: false });
  };
  const handleClose = () => {
    setEdit({ status: false });
  };
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
      uniqueId: Math.random() * 10000,
    },
  });
  useEffect(() => {
    setValue("verificationCode","")
  }, [verifyEdit]);

  const onSubmit = async () => {
    const { status, data } = await apiPost(apiPath.userProfileUpdate, {
      fullName: edit?.item,
    });
    if (status === 200) {
      if (data.success) {
        getProfileData();
        handleClose()
        toast.success(data?.message);
       
      } else {
        toast.error(data?.message);
      }
    } else {
      toast.error(data?.message);
    }
  };
  const [isLoader, setLoader] = useState(false);
  // console.log(inputRef?.current?.state?.formattedNumber.replace(/\s/g, ''));
  const onSubmit1 = async (body) => {
    
    setLoader(true);
    const { status, data } = await apiPost(apiPath.verifyOtp, {
      phone_number: inputRef?.current?.state.selectedCountry?.countryCode+body?.mobile?.substring(inputRef?.current?.state.selectedCountry?.countryCode?.length,
        body?.mobile?.toString()?.length
      ),
      type:"password",
      password:body?.verificationCode
        // otp:body?.verificationCode
    });
    if (status === 200) {
      if (data.success) {
        
        setLoader(false);
        handleCloseVerify();
        getProfileData();
        toast.success("Otp verified successfully");
        reset();
        setSendOtpStatus(false);
      } else {
        setLoader(false);
        toast.error(data?.message);
      }
    } else {
      setLoader(false);
      toast.error(data?.message);
    }
  };
  return (
    <SidebarLayout heading={t("My_Profile")}>
      {" "}
      <div className="p-sm-3 p-2 inner-sidebar-content">
        <Table className="align-middle bg-white">
          <tbody>
            <tr>
              <td width="30%">{t("User_Name")}</td>
              <td width="70%" colSpan="2">
                {user?.user?.username}
              </td>
            </tr>
            {/* <tr>
              <td width="30%">{t("Email")}</td>
              <td width="40%">
                {profileData?.email}
              </td>
              <td width="30%">
                <Button
                  onClick={() => setEdit({ ...edit, status: true,item:profileData?.firstName })}
                  className="theme-btn py-1 px-3 fs-6"
                >
                  {t("Edit")}
                </Button>
              </td>
            </tr> */}
            <tr>
              <td width="30%">Mobile</td>
              <td width="40%">
                {profileData?.phone}
              </td>
              <td width="30%">
                 {profileData?.phone!=0 ?
                 <>
                        {/* { profileData?.isVerified==false ?
                            <Button
                            onClick={() => {setVerifyEdit({ ...verifyEdit, status: true,item:profileData?.phone })}}
                            className="theme-btn py-1 px-3 fs-6"
                          >
                            {"Verify"}
                            </Button>
                          :
                            <span style={{color:`green`,fontWeight:`600`}}>Verified</span>
                          }  */}
                           </>
                :
                      <Button
                          onClick={() => setVerifyEdit({ ...verifyEdit, status: true,phoneStatus:"add",item:profileData?.phone })}
                          className="theme-btn py-1 px-3 fs-6"
                         >
                 {"Add Phone"}
               </Button>
                 }
                     
                
              </td>
            </tr>
            <tr>
             
            
             
           </tr> 
             
           <tr>
              <td width="30%">{t("Password")}</td>
              <td width="40%">********</td> 
            <td width="30%">
                <Button
                  onClick={() => navigate("/change-password")}
                  className="theme-btn py-1 px-3 fs-6"
                >
                  {t("Edit")}
                </Button>
              </td> 
             </tr>
          </tbody>
        </Table>
      </div>
      {edit?.status && (
        <Modal centered show={edit?.status} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Full Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="w-100"
              placeholder="Enter Full Name"
              value={edit?.item}
              onChange={(e) => {
                setEdit({ ...edit, item: e.target.value });
              }}
              style={{
                borderRadius: "5px",
                padding: "5px",
                border: "1px solid grey",
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onSubmit}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {verifyEdit?.status && (
       
       <Modal centered show={verifyEdit?.status} onHide={handleCloseVerify}>
         <Modal.Header closeButton>
           <Modal.Title>Verify OTP</Modal.Title>
         </Modal.Header>
         <Form onSubmit={handleSubmit(onSubmit1)}>
         <Modal.Body>
        
         {
           verifyEdit?.phoneStatus=="add" &&
           <>
             <Form.Group className="form-group d-flex  mb-3">
           
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
          </>
           }
            
         <Form.Group className="d-flex">
         <div style={{ position:'relative',width:`100%`}} className="mb-2">
         <Form.Control
           type="text"
           placeholder="Enter password"
           className={errors.verificationCode ? " is-invalid " : ""}
           {...register("verificationCode", {
             required: "Please enter password",
           
           })}
         />        
         </div>
     </Form.Group>

     {errors?.verificationCode?.message && (<div className="text-danger">{errors?.verificationCode?.message}</div>)}

    

    {/* { getSendOtpStatus? 
    <Button 
       disabled={seconds > 0 || minutes > 0}
       
         onClick={() => sendMobileOTP("resend",inputRef?.current?.state?.formattedNumber?inputRef?.current?.state?.formattedNumber.replace(/\s/g, '').replace(/\+/g, ''):profileData?.phone)} 
         className="theme-btn py-1 px-3 fs-6">{"Resend Otp"}
     </Button>:
      <Button onClick={() => sendMobileOTP("first",inputRef?.current?.state?.formattedNumber?inputRef?.current?.state?.formattedNumber.replace(/\s/g, '').replace(/\+/g, ''):profileData?.phone)} className="theme-btn py-1 px-3 fs-6">{"Send Otp"}
     </Button>}
     <div className="countdown-text">
     {seconds > 0 || minutes > 0 ? (
       <p>
         Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
         {seconds < 10 ? `0${seconds}` : seconds}
       </p>
     ) : (
       <p>Didn't recieve code?</p>
     )}

     
   </div> */}
         </Modal.Body>
         <Modal.Footer>
         <button type="submit" className="submit-btn"  disabled={isLoader?"disabled":""}>
             <span>  {isLoader ? "Loading..." : t("Confirm")}</span>
           </button>
         </Modal.Footer>
         </Form>
       </Modal>
     )}
    </SidebarLayout>
  );
};

export default Profile;
