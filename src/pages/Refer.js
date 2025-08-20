import React, { useContext, useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import LayoutNew from "../components/shared/LayoutNew";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import MessageRefer from "../components/MessageRefer";
import { FaPlayCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../context/AuthContext";
import { apiGet, apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "react-toastify";

const Refer = () => {
  const navigate = useNavigate();
  const { profileData, getProfileData } = useContext(AuthContext);
  const [share, setShare] = useState(false);
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState({});
  const handleClose = () => {
    setEdit({ status: false });
  };
  const onSubmit = async () => {
    const { status, data } = await apiPost(apiPath.userProfileUpdate, {
      referalCode: edit?.item,
    });
    if (status === 200) {
      if (data.success) {
        getProfileData();
        handleClose();
        setShare(true);
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } else {
      toast.error(data?.message);
    }
  };

  const getData = async () => {
    const { status, data } = await apiGet(apiPath.refralList);
    if (status === 200) {
      if (data.success) {
        setList(data?.results);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <LayoutNew>
      <div className="main top-class">
        <div class="p-title title-box">
          <IoMdArrowBack onClick={() => navigate(-1)} size={30} />
          <div class="title w-100">Refer and Earn </div>
        </div>
        <div className="dw-p withdraw-box page-content-box w-100 bg-gradual-black">
          <div className="refer-header">
            <h2 className="text-center">
            BDT {list?.AllAmountEarn || 0} <br />
              Total Coin Earned
            </h2>
          </div>
          <div className="refer-main">
            <div className="refer-main-top">
              <h5 style={{ fontWeight: "700", marginBottom: "10px" }}>
                How it Works
              </h5>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    height: "150px",
                    width: "100%",
                    background: "#111111",
                    borderRadius: "10px",
                  }}
                ></div>
                <FaPlayCircle
                  size={30}
                  style={{
                    position: "absolute",
                    color: "white",
                    top: "45%",
                    left: "48%",
                  }}
                />
              </div>
            </div>
            {list?.list?.length > 0 &&
            <div className="refer-main-bottom mb-3">
              <h6 style={{ fontWeight: "700", marginBottom: "10px" }}>
                Then Play, you collect
              </h6>
              <div className="refer-main-bottom-inner">
                <div className="refer-main-bottom-inner-inner refer-main-top-header">
                  <span className="p-2">Friend's</span>
                  <span className="p-2">You Collect</span>
                </div>
                {list?.list?.length > 0 ? (
                  list?.list?.map((res) => {
                    return (
                      <div className="refer-main-bottom-inner-inner">
                        <div className="d-flex flex-column p-2">
                          <span className="golden">{res?.firstName || res?._id}</span>
                        </div>
                        <div className="d-flex flex-column p-2">
                          <span>BDT {res?.earnTotal}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No Record Found</p>
                )}
                {/* <div className="refer-main-bottom-inner-inner">
                  <div className="d-flex flex-column p-2">
                    <span className="golden">Mark 2</span>
                  </div>
                  <div className="d-flex flex-column p-2">
                    <span>BDT 300</span>
                  </div>
                </div> */}

                {/* <div className="refer-main-bottom-inner-inner">
                  <div className="d-flex flex-column p-2">
                    <span className="golden">Mark 3</span>
                  </div>
                  <div className="d-flex flex-column p-2">
                    <span>PBU 9</span>
                  </div>
                </div> */}

                <div className="refer-main-bottom-inner-inner refer-main-bottom-header">
                  <span className="p-2">Total Coins</span>
                  <span className="p-2">BDT {list?.AllAmountEarn || 0}</span>
                </div>
              </div>
            </div>}
            <div className="d-flex justify-content-between align-items-center gap-1 refer-button">
              <button
                onClick={() =>
                  window.open(
                    `https://web.whatsapp.com/send?text=https://9wkt.win/register?referral_code=${profileData?.referalCode}`,
                    "_blank"
                  )
                }
              >
                <FaWhatsapp size={17} style={{ marginRight: "5px" }} />
                INVITE NOW
              </button>
              <button onClick={() => setShare(true)}>
                <FaShareAlt size={16} style={{ marginRight: "5px" }} />
                OTHER OPTION
              </button>
            </div>
          </div>
        </div>
      </div>
      {share && (
        <MessageRefer
          profileData={profileData}
          setEdit={setEdit}
          setShare={setShare}
          share={share}
        />
      )}
      {edit?.status && (
        <Modal centered show={edit?.status} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Referal Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="w-100"
              placeholder="Enter Refral Code"
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
    </LayoutNew>
  );
};

export default Refer;
