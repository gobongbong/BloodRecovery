import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addPage } from "../Modalmove/subscribers/action";
import "./Message_read.css";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import MESSAGEIMG from "../../Img/message.png";
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
import * as successAlert from "../Common/MakeAlert/successAlert.js"
const Message_read = (id) => {
  const [consumer, setConsumer] = useState("");
  const [producer, setProducer] = useState("");
  const [contents, setContents] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/notice/message/one/" +
          sessionStorage.getItem("messageId")
      )
      .then(function (response) {
        
        setConsumer(response.data.consumer);
        setProducer(response.data.producer);
        setContents(response.data.contents);
        setDate(response.data.date);
        setTitle(response.data.title);
      });
  }, []);

  const deleteMesssage = () => {
    axios.delete(
      "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/notice/message/one/" +
        +sessionStorage.getItem("messageId")
    );
    successAlert.successAlert("메시지가 삭제되었습니다.");
  };

  return (
    <div className="Message-read-container">
      <div className="Message-read-nav-container">
        <div className="Message-read-nav-class">
          <Menu_left_nav
            name={"메시지상세조회"}
            imgname={MESSAGEIMG}
          ></Menu_left_nav>
        </div>
        <div className="Message-read-nav-goback">
          <img
            className="Message-read-goback-bntimg-class"
            onClick={() => id.addPage(sessionStorage.getItem("lastbefore"))}
            src={GOBACKBTN}
          ></img>
        </div>
      </div>

      <div className="Message-read-contents-container">
        <div className="Message-read-contents-title-container">
          <div className="Message-read-contents-title-class">
            <b>제목: {title}</b>
          </div>
        </div>
        <div className="Message-read-contents-container">
          <div className="Message-read-contents-producer-container">
            <div className="Message-read-contents-producer-class">
              <b>보낸이: {producer}</b>
            </div>
          </div>
          <div className="Message-read-contents-container">
            <div className="Message-read-contents-content-container">
              <div className="Message-read-contents-content-class">
                <b>내용: {contents}</b>
              </div>
            </div>
            <div className="Message-read-contents-container">
              <div className="Message-read-contents-date-container">
                <div className="Message-read-contents-date-class">
                  <b>보낸 날짜: {date}</b>
                </div>
              </div>
              <div className="Message-read-contents-container">
                <div className="Message-read-footer-container">
                  <b>
                    <button
                      className="Message-read-footer-button-class"
                      onClick={() => deleteMesssage()}
                    >
                      메시지 삭제
                    </button>
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.page,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addPage: (text) => dispatch(addPage(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message_read);
// export default Message_read;
