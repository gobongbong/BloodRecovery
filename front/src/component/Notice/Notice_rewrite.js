import React, { useState, useEffect } from "react";
import CARDDONATION from "../../Img/CARDDONATION.png";
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import S3Upload from "../Common/Function/S3fileUpload";
import "./Notice_rewrite.css";
import Common_Button_IMG from "../../component/Common/Button/Common_Button_IMG";
import WRITEWHITEIMG from "../../Img/DirectedIMG/WRITE_WHITE.png";
import axios from "axios";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

function Notice_write(props) {
  const [getIMG, setIMG] = useState(null);
  const [inputs, setInputs] = useState({
    notice_title: "",
    notice_context: "",
    notice_imageurl: "",
  });

  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/notice/" +
          // "http://localhost:8005/"
          sessionStorage.getItem("boardId")
      )

      .then(function (response) {
        console.log(response);
        const firstinputs = {
          notice_context: response.data.contents,
          notice_title: response.data.title,
          notice_imageurl: response.data.imageUrl,
        };
        setInputs(firstinputs);
        setIMG(response.data.img);
        // setStartDate(response.data.periodFrom)
      });
  }, []);
  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...inputs,
      [name]: value,
    };
    //만든 변수를 seInput으로 변경해준다.
    setInputs(nextInputs);
    // console.log(inputs);
  };

  function changeFormat(date, format) {
    if (moment(date).isValid()) {
      return moment(date).format(format);
    } else {
      return null;
    }
  }
  const senddata = () => {
    if (inputs.request_title === "") {
      alert("제목을 넣어주세요");
    } else if (inputs.request_context === "") {
      alert("내용을 넣어주세요");
    } else {
      axios
        .put(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/notice/" +
            // "http://localhost:8005/"
            sessionStorage.getItem("boardId"),
          {
            writerUserId: sessionStorage.getItem("userId"),
            title: inputs.notice_title,
            contents: inputs.notice_context,
            image: getIMG,
            imageUrl: inputs.notice_imageurl,
          }
        )
        .then(function (response) {
          console.log("ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ" + response);
        });
      alert("게시글이 수정되었습니다.");
    }
  };

  const getfilename = (value) => {
    // console.log("wow",value)
    setIMG(value);
  };
  return (
    <div className="Notice-rewrite-container">
      {/* {console.log("rewrite", inputs)} */}
      <div className="Notice-rewrite-nav-container">
        <div className="Notice-rewrite-nav-class">
          <Menu_left_nav
            name={"공지사항"}
            imgname={CARDDONATION}
          ></Menu_left_nav>
        </div>
        <div className="Notice-rewrite-nav-goback">
          <img
            className="Notice-rewrite-goback-bntimg-class"
            onClick={() => props.addPage("공지사항")}
            src={GOBACKBTN}
          ></img>
        </div>
      </div>
      <div className="Notice-rewrite-content-container">
        <div className="Notice-rewrite-content-class">
          <div className="Notice-rewrite-card-class">
            <div className="Notice-rewrite-card-total">
              <div className="Notice-rewrite-card-nav-class">
                <input
                  name="notice_title"
                  className="Notice-rewrite-card-title-class"
                  value={inputs.notice_title}
                  onChange={onChange}
                ></input>
              </div>

              <div className="Notice-rewrite-card-context-class">
                <textarea
                  name="notice_context"
                  className="Notice-rewrite-card-context-input"
                  value={inputs.notice_context}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="Notice-rewrite-card-footer-class"></div>
            </div>
          </div>
          <div className="Notice-rewrite-footer-container">
            <div className="Notice-rewrite-footer-upload-container">
              <div className="Notice-rewrite-footer-upload">
                <S3Upload getfilename={getfilename} />
              </div>
            </div>

            <div className="Notice-rewrite-footer-imageurl-container">
              Img url:
              <input
                name="notice_imageurl"
                className="Notice-rewrite-footer-imageurl"
                value={inputs.notice_imageurl}
                onChange={onChange}
              ></input>
            </div>
            <div className="Notice-rewrite-btn-container">
              <div className="Notice-rewrite-btn-class" onClick={senddata}>
                <Common_Button_IMG
                  name={"수정완료"}
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
