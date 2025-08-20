import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { IoMdArrowBack, IoMdSend } from "react-icons/io";
import { MdGetApp } from "react-icons/md";
import { isEmpty } from "lodash";
import { saveAs } from "file-saver";
import AuthContext from "../context/AuthContext";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { toast } from "wc-toast";
import { useNavigate } from "react-router-dom";
const ChatDetail = ({
  sendMessage,
  uploadImage,
  message,
  value,
  setValue,
  deleteChat,
  select,
  setSelect,
}) => {
  const navigate = useNavigate()
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    uploadImage(blob, "audio");
  };

  const { user } = useContext(AuthContext);
  const submit = () => {
    sendMessage(value);
  };

  const handelSelect = (value) => {
    setSelect((prev) => {
      if (isEmpty(prev)) {
        return [value];
      } else {
        if (prev?.includes(value)) {
          return prev.filter((res) => {
            return res !== value;
          });
        } else {
          return [...prev, value];
        }
      }
    });
  };

  const ImageMessage = ({ message }) => {
    return (
      <div style={{ position: "relative", marginLeft: "5px" }}>
        {message?.text?.includes(".pdf") ? (
          <div style={{ display: "flex" }}>
            {/* <img src={iconPDF} alt="pdf-icon" style={{ width: 80 }} /> */}
            <p style={{ fontSize: 14 }}>{message.text.split("/").pop()}</p>
          </div>
        ) : (
          <img
            style={{ width: 300, height: "100%", objectFit: "cover" }}
            src={`${process.env.REACT_APP_API_BASE_URL}${message?.file}`}
            alt={`${process.env.REACT_APP_API_BASE_URL}${message?.file}`}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "45%",
          }}
        >
          <MdGetApp
            onClick={(e) =>
              saveAs(
                `${process.env.REACT_APP_API_BASE_URL}${message?.file}`,
                "image.jpg"
              )
            }
            color="white"
            fontSize={25}
            style={{
              border: ".5px solid white",
              padding: "4px",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
    );
  };
  const Audio = ({ message }) => {
    return (
      <div
        style={{ marginLeft: "5px" }}
        className="d-flex flex-column align-items-end w-100"
      >
        <audio
          style={{ width: "200px" }}
          controls
          src={`${process.env.REACT_APP_API_BASE_URL}${message?.file}`}
        ></audio>
        <span
          style={{
            fontSize: "10px",
            color: "#919191",
            marginTop: "6px",
            wordBreak: "keep-all",
            display: "flex",
          }}
        >
          {formatDate(message?.createdAt || "")}
          <BsCheckAll color={message?.isRead ? "#6DAEEF" : ""} size={16} />
        </span>
      </div>
    );
  };

  const Video = ({ message }) => {
    return (
      <div
        style={{ marginLeft: "5px" }}
        className="d-flex flex-column align-items-end"
      >
        <video width="150" height="200" controls>
          <source
            src={`${process.env.REACT_APP_API_BASE_URL}${message?.file}`}
            type="video/mp4"
          />
        </video>
        <span
          style={{
            fontSize: "10px",
            color: "#919191",
            marginTop: "6px",
            wordBreak: "keep-all",
            display: "flex",
          }}
        >
          {formatDate(message?.createdAt || "")}
          <BsCheckAll color={message?.isRead ? "#6DAEEF" : ""} size={16} />
        </span>
      </div>
    );
  };
  const TextMessage = ({ message }) => {
    return (
      <>
        <span style={{ fontSize: "14px", padding: "0 15px 0 5px" }}>
          {message?.message}
        </span>
        <span
          style={{
            fontSize: "10px",
            color: "#919191",
            marginTop: "6px",
            wordBreak: "keep-all",
            marginTop: "auto",
            display: "flex",
          }}
        >
          {formatDate(message?.createdAt || "")}
          <BsCheckAll color={message?.isRead ? "#6DAEEF" : ""} size={16} />
        </span>
      </>
    );
  };

  return (
    
      <div
        style={{
          paddingBottom: "5px",
          background: "white",
        }}
      >
        <div
          style={{
            padding: "1px 10px",
            position: "fixed",
            // top: "1%",
            zIndex: "999",
            background: "white",
            width: "100%",
            zIndex: "9999999999",
          }}
          className="d-flex align-items-center justify-content-between"
        >
          <div className="d-flex align-items-center">
            <IoMdArrowBack onClick={() => navigate(-1)} size={22} style={{marginRight:"10px"}} />
            <FaUserCircle
              size={30}
              color="grey"
              style={{ marginRight: "5px" }}
            />
            <div className="d-flex align-items-start flex-column">
              <span style={{ fontSize: "14px" }}>Customer Support</span>
              <span
                style={{ fontSize: "12px", fontWeight: "600", color: "green" }}
              >
                Online
              </span>
            </div>
          </div>
          {select?.length > 0 && (
            <MdDeleteForever
              onClick={() => deleteChat(select)}
              color="red"
              size={20}
            />
          )}
        </div>
        <div className="message-chat position-relative">
          <div className="message-chat-inner" style={{padding:"0 5px", paddingTop: "3.4rem" }}>
            {message?.map((res) => {
              return (
                <div
                  className={
                    res?.sender?._id !== user?.user?._id
                      ? "message-wrapper"
                      : "message-box"
                  }
                  onClick={() => handelSelect(res?._id)}
                >
                  {select?.includes(res?._id) && (
                    <FaCircleCheck
                      color="#18b0c8"
                      size={
                        res?.fileType == "image/png" ||
                        res?.fileType == "audio/mp3"
                          ? 25
                          : 16
                      }
                    />
                  )}
                  {res?.fileType?.split("/")[0] == "image" ? (
                    <ImageMessage message={res} />
                  ) : res?.fileType?.split("/")[0] == "audio" ? (
                    <Audio message={res} />
                  ) : res?.fileType?.split("/")[0] == "video" ? (
                    <Video message={res} />
                  ) : (
                    !isEmpty(res?.message) && <TextMessage message={res} />
                  )}
                </div>
              );
            })}
          </div>
          <div
            style={{
              position: "fixed",
              background: " #ededed",
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: "10px 15px",
              bottom: "0%",
              zIndex: "99999999999",
            }}
          >
            <>
              {!recorderControls?.isRecording && (
                <label htmlFor="fileInput">
                  <FiPaperclip
                    size={20}
                    color="#919191"
                    style={{ marginRight: "10px" }}
                  />
                </label>
              )}
              <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                recorderControls={recorderControls}
                downloadFileExtension="webm"
              />
              {!recorderControls?.isRecording && (
                <>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (
                        ["video", "audio", "image"].includes(
                          e.target.files[0]?.type?.split("/")[0]
                        )
                      ) {
                        uploadImage(e.target.files[0], "image");
                      } else {
                        toast.error(
                          "Please upload only Image , Video and Audio Format"
                        );
                      }
                    }}
                  />{" "}
                  <div
                    style={{
                      borderRadius: "18px",
                      backgroundColor: " #FFFFFF",
                      width: "70%",
                      marginRight: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    <input
                      style={{
                        width: "100%",
                        padding: "20px",
                        paddingLeft: "25px",
                        fontSize: "14px",
                        height: " 20px",
                        width: "100%",
                        border: "none",
                        borderRadius: "20px",
                      }}
                      placeholder="Type a message"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                    />
                  </div>
                </>
              )}
            </>
            {!recorderControls?.isRecording && (
              <IoMdSend onClick={() => submit()} size={20} color="#919191" />
            )}
          </div>
        </div>
      </div>
    
  );
};

export default ChatDetail;

const data = [
  {
    message: "Hello!",
    name: "Jatin",
    time: new Date(),
    count: 2,
  },
  {
    message: "Hello!",
    name: "Jatin",
    time: new Date(),
    count: 2,
  },
  {
    message: "Hello!",
    name: "Jatin",
    time: new Date(),
    count: 2,
  },
  {
    message: "Hello!",
    name: "Jatin",
    time: new Date(),
    count: 2,
  },
];

export const formatDate = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};
