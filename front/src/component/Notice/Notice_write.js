import React, { useState } from "react";
import NoticeIMG from "../../Img/CARDDONATION.png";
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import S3Upload from "../Common/Function/S3fileUpload";
import "./Notice_write.css";
import Common_Button_IMG from "../../component/Common/Button/Common_Button_IMG";
import WRITEWHITEIMG from "../../Img/DirectedIMG/WRITE_WHITE.png";
import axios from "axios";
import * as successAlert from "../Common/MakeAlert/successAlert.js"
function Notice_write(props) {
  const [getIMG, setIMG] = useState(null);

  const [inputs, setInputs] = useState({
    notice_title: "",
    notice_context: "",
    notice_imageurl: "",
    notice_date2: "", //date형식으로
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
    if (name === "notice_title") {
    }
    // console.log(inputs);
  };

  const senddata = () => {
    if (inputs.notice_title === "") {
      successAlert.errorAlert("제목을 넣어주세요");
    } else if (inputs.notice_context === "") {
      successAlert.errorAlert("내용을 넣어주세요");
    } else {
      axios
        .post(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/notice",
          // "http://localhost:8005",
          {
            writerUserId: sessionStorage.getItem("userId"),
            title: inputs.notice_title,
            contents: inputs.notice_context,
            image: getIMG,
            imageUrl: inputs.notice_imageurl,
          }
        )
        .then(function (response) {
          console.log(response);
        });
        successAlert.successAlert("게시글이 작성되었습니다.");
      props.addPage("공지사항");
    }
  };

  const getfilename = (value) => {
    // console.log("wow",value)
    setIMG(value);
  };

  return (
    <div className="Notice-write-container">
      <div className="Notice-write-nav-container">
        <div className="Notice-write-nav-class">
          <Menu_left_nav name={"공지사항"} imgname={NoticeIMG}></Menu_left_nav>
        </div>
        <div className="Notice-write-nav-goback">
          <img
            className="Notice-write-goback-bntimg-class"
            onClick={() => props.addPage("공지사항")}
            src={GOBACKBTN}
          ></img>
        </div>
      </div>
      <div className="Notice-write-content-container">
        <div className="Notice-write-content-class">
          <div className="Notice-write-card-class">
            <div className="Dircected-write-card-total">
              <div className="Notice-write-card-nav-class">
                <input
                  name="notice_title"
                  className="Notice-write-card-title-class"
                  onChange={onChange}
                ></input>
              </div>

              <div className="Notice-write-card-context-class">
                <textarea
                  name="notice_context"
                  className="Notice-write-card-context-input"
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="Notice-write-card-footer-class"></div>
            </div>
          </div>
          <div className="Notice-write-footer-container">
            <div className="Notice-write-footer-upload-container">
              <div className="Notice-write-footer-upload">
                <S3Upload getfilename={getfilename} />
              </div>
            </div>

            <div className="Notice-write-footer-imageurl-container">
              Image url:
              <input
                name="notice_imageurl"
                className="Notice-write-footer-imageurl"
                onChange={onChange}
              ></input>
            </div>

            <div className="Notice-write-btn-container">
              <div className="Notice-write-btn-class" onClick={senddata}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Notice_write);
