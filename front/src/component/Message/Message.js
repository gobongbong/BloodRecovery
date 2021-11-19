import React, { useEffect, useState } from "react";
import axios from "axios";
import Message_card from "./Message_card";
import "./Message.css";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import MESSAGEIMG from "../../Img/message.png";
import * as successAlert from "../Common/MakeAlert/successAlert.js"
const Message = (props) => {
  const [messages, setMessages] = useState([]);
  const [messageMode, setMessageMode] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/notice/message/" +
          messageMode +
          sessionStorage.getItem("userId")
      )
      .then(function (response) {
        setMessages(response.data);
      });
  }, [messageMode]);


  const deleteMesssage = (mode) => {
    axios.delete(
      "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/notice/message/" +
        mode +
        sessionStorage.getItem("userId")
    );
 
    if (mode === "") {
      successAlert.successAlert("메시지 전체가 삭제되었습니다.");
    } else {
      successAlert.successAlert("읽은 메시지가 삭제되었습니다.");
    }
  };


  return (
    <div className="Message-main-container">
      <div className="Message-main-nav-container">
        <div className="Message-main-nav-class">
          <Menu_left_nav name={" 메시지"} imgname={MESSAGEIMG}></Menu_left_nav>
        </div>
        <div className="Mypage-main-nav-container"></div>
      </div>
      <div className="Message-main-button-container">
        <button
          className="Message-main-button-show"
          onClick={() => setMessageMode("")}
        >
          전체 메시지
        </button>
        <button
          className="Message-main-button-show"
          onClick={() => setMessageMode("read/")}
        >
          읽은 메시지
        </button>
        <button
          className="Message-main-button-show"
          onClick={() => setMessageMode("unread/")}
        >
          안읽은 메시지
        </button>
        <button
          className="Message-main-button-delete"
          onClick={() => deleteMesssage("")}
        >
          전체 삭제
        </button>
        <button
          className="Message-main-button-delete"
          onClick={() => deleteMesssage("read/")}
        >
          읽은 메시지 삭제
        </button>
      </div>
      <div className="Message-main-cardmain-container">
        {messages.map((menu, index) => (
          <Message_card getData={messages[index]} key={index}></Message_card>
        ))}
      </div>
    </div>
  );
};

export default Message;
