import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ChatDetail from "./ChatDetail";
import { io } from "socket.io-client";
import AuthContext from "../context/AuthContext";
import { isEmpty } from "lodash";
import { apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "wc-toast";
const Index = () => {
  const [socket, setSocket] = useState({});
  const [value, setValue] = useState("");
  const { user, profileData, chatId, getNotificationCount } =
    useContext(AuthContext);
  const [message, setMessage] = useState([]);
  const [select, setSelect] = useState([]);
  const [checkRefresh, setCheckRefresh] = useState(true);

  let receiverId =
    chatId == "B2B" ? profileData?.agentId : profileData?.subAdminId;
  const getSocket = () => {
    const newSocket = io(
      `${process.env.REACT_APP_API_BASE_URL}?token=${localStorage.getItem(
        "token"
      )}&userType=front`,
      {
        transports: ["websocket"],
      }
    );
    setSocket(newSocket);
    newSocket.emit("markAsRead", profileData?.visiterId, user?.user?._id);
    newSocket.emit("getChatHistory", profileData?.visiterId || "");
    newSocket.on("newMessage", (inbox) => {
      if (inbox?.receiver == user?.user?._id) {
        newSocket.emit("getChatHistory", inbox?.chatId);
      }
    });
    newSocket.on("messageDeleted", (message) => {
      let ids = message?.messageIds;
      if (ids?.length > 0) {
        setMessage((prev) => {
          return prev.filter(function (obj) {
            return !ids.some(function (obj2) {
              return obj._id == obj2;
            });
          });
        });
        setSelect([]);
      }
    });
    newSocket.on("chatHistory", (messages) => {
      setMessage(messages);
    });
    return () => newSocket.close();
  };
  
  useEffect(() => {
    getNotificationCount();
  }, []);

  useEffect(() => {
    if (checkRefresh && !isEmpty(user) && !isEmpty(profileData)) {
      getSocket();
    }
  }, [checkRefresh, user, profileData]);

  document.addEventListener("visibilitychange", function () {
    if (
      !document.hidden &&
      !checkRefresh &&
      !isEmpty(user) &&
      !isEmpty(profileData)
    ) {
      setCheckRefresh(true);
      if (!isEmpty(socket)) {
        socket.disconnect();
      }
    } else {
      setCheckRefresh(false);
    }
  });
  function sendMessage(value, file, fileType) {
    if (!isEmpty(file)) {
      socket.emit("sendMessage", {
        senderId: user?.user?._id,
        message: null,
        receiverId: receiverId,
        file: file,
        fileType: fileType,
        createdAt: new Date(),
      });
      setValue("");
      setMessage((prev) => {
        return [
          ...prev,
          {
            sender: {
              _id: user?.user?._id,
            },
            receiver: {
              _id: receiverId,
            },
            message: value || null,
            timestamp: new Date(),
            isRead: false,
            file: file || null,
            fileType: fileType || "text",
            createdAt: new Date(),
          },
        ];
      });
    } else {
      if (!isEmpty(value) && value.trim()) {
        socket.emit("sendMessage", {
          senderId: user?.user?._id,
          receiverId: receiverId,
          message: value,
          file: null,
          fileType: "text",
          createdAt: new Date(),
        });
        setValue("");
        setMessage((prev) => {
          return [
            ...prev,
            {
              sender: {
                _id: user?.user?._id,
              },
              receiver: {
                _id: receiverId,
              },
              message: value || null,
              timestamp: new Date(),
              isRead: false,
              file: file || null,
              fileType: fileType || "text",
              createdAt: new Date(),
            },
          ];
        });
      }
    }
  }

  function deleteMessage(messageId) {
    socket.emit(
      "deleteMessage",
      profileData?.visiterId,
      messageId.join(),
      (message) => {
        console.log(message, "chat");
      }
    );
  }
  const uploadImage = async (image, type) => {
    let form = new FormData();
    form.append(
      "TransactionFile",
      type == "image"
        ? image
        : new File([image], "audiofile.mp3", {
            type: "audio/mp3",
          })
    );
    const { status, data } = await apiPost(apiPath.reciptUpload, form);
    if (status == 200) {
      sendMessage("", data?.path, data?.mimetype);
    } else {
      toast.error("Something went wrong!");
    }
  };
  return (
    // <LayoutNew>
    <Container className="p-0">
      <ChatDetail
        message={message}
        uploadImage={uploadImage}
        sendMessage={sendMessage}
        value={value}
        setValue={setValue}
        deleteChat={deleteMessage}
        select={select}
        setSelect={setSelect}
      />
    </Container>
    // </LayoutNew>
  );
};

export default Index;

export const formatDate = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};
