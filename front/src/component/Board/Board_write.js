import React, { useState } from "react";
import BoardIMG from "../../Img/CARDDONATION.png";
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import S3Upload from "../Common/Function/S3fileUpload";
import "./Board_write.css";
import BLOODDROP from "../../Img/DirectedIMG/blood-drop.png";
import Common_Button_IMG from "../../component/Common/Button/Common_Button_IMG";
import WRITEWHITEIMG from "../../Img/DirectedIMG/WRITE_WHITE.png";
import axios from "axios";
import * as successAlert from "../Common/MakeAlert/successAlert.js"
// import Board_write_select from "./Board_write_select";
// import Directed_write_select from "./Directed_write_select";

function Board_write(props) {
  //헌혈증받는변수
  const [requestCount, setRequestCount] = useState(0);
  const [getIMG, setIMG] = useState(null);

  const [inputs, setInputs] = useState({
    request_title: "",
    request_context: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...inputs,
      [name]: value,
    };
    //만든 변수를 seInput으로 변경해준다.
    setInputs(nextInputs);
    if (name === "request_title") {
    }
    console.log(inputs);
  };

  const countClick = (text) => {
    if (text === "countdown" && requestCount > 0) {
      setRequestCount(requestCount - 1);
    } else if (text === "countup" && requestCount < 10) {
      setRequestCount(requestCount + 1);
    }
  };

  const senddata = () => {
    if (inputs.request_title === "") {
      successAlert.errorAlert("제목을 넣어주세요");
    } else if (inputs.request_context === "") {
      successAlert.errorAlert("내용을 넣어주세요");
    } else if (requestCount === 0) {
      successAlert.errorAlert("기부받을 헌혈증 개수를 정해주세요.");
    } else {
      axios
        .post(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/card/requests/requestItem",
          // "http://localhost:8003/requests/requestItem",
          {
            userId: sessionStorage.getItem("userId"),
            title: inputs.request_title,
            contents: inputs.request_context,
            image: getIMG,
            requestCount: requestCount,
          }
        )
        .then(function (response) {
          console.log(response);
        });
        successAlert.successAlert("게시글이 작성되었습니다.");
      props.addPage("헌혈증_기부");
    }
  };

  const getfilename = (value) => {
    // console.log("wow",value)
    setIMG(value);
  };

  return (
    <div className="Board-write-container">
      <div className="Board-write-nav-container">
        <div className="Board-write-nav-class">
          <Menu_left_nav
            name={"헌혈증 기부"}
            imgname={BoardIMG}
          ></Menu_left_nav>
        </div>
        <div className="Board-write-nav-goback">
          <img
            className="Board-write-goback-bntimg-class"
            onClick={() => props.addPage("헌혈증_기부")}
            src={GOBACKBTN}
          ></img>
        </div>
      </div>
      <div className="Board-write-content-container">
        <div className="Board-write-content-class">
          <div className="Board-write-card-class">
            <div className="Dircected-write-card-total">
              <div className="Board-write-card-nav-class">
                <input
                  name="request_title"
                  className="Board-write-card-title-class"
                  onChange={onChange}
                ></input>
              </div>

              <div className="Board-write-card-context-class">
                <textarea
                  name="request_context"
                  className="Board-write-card-context-input"
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="Board-write-card-footer-class"></div>
            </div>
          </div>
          <div className="Board-write-footer-container">
            <div className="Board-write-footer-upload-container">
              <div className="Board-write-footer-upload">
                <S3Upload getfilename={getfilename} />
              </div>
            </div>
            <div className="Board-write-footer-givecount-container">
              <div className="Board-write-footer-givecount">
                <img
                  src={BLOODDROP}
                  className="Board-write-footer-givecountimg"
                ></img>
                <div className="Board-write-footer-givecounttext">
                  지정헌혈 받을 횟수
                </div>
                <div className="Board-write-footer-count-container">
                  <div
                    className="Request_countdown"
                    onClick={() => countClick("countdown")}
                  >
                    -
                  </div>
                  <div className="Request_count">{requestCount}</div>
                  <div
                    className="Request_countup"
                    onClick={() => countClick("countup")}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>

            <div className="Board-write-btn-container">
              <div className="Board-write-btn-class" onClick={senddata}>
                <Common_Button_IMG
                  name={"작성완료"}
                  imgname={WRITEWHITEIMG}
                ></Common_Button_IMG>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Board_write);
