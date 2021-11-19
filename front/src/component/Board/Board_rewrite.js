import React, { useState, useEffect } from "react";
import CARDDONATION from "../../Img/CARDDONATION.png";
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import S3Upload from "../Common/Function/S3fileUpload";
import "./Board_rewrite.css";
import BLOODDROP from "../../Img/DirectedIMG/blood-drop.png";
import Common_Button_IMG from "../../component/Common/Button/Common_Button_IMG";
import WRITEWHITEIMG from "../../Img/DirectedIMG/WRITE_WHITE.png";
import axios from "axios";
import * as successAlert from "../Common/MakeAlert/successAlert.js"

function Board_write(props) {
  // const [startDate, setStartDate] = useState();
  // const [endDate, setendDate] = useState(new Date());
  //헌혈증받는변수
  const [restatus, setRestatus] = useState(false);
  // const [getData, setGetData] = useState();
  const [getIMG, setIMG] = useState(null);
  // const [titlecheck,setTitleCheck]=useState(false)
  // const [contextcheck,setContextCheck]=useState(false)
  // const [bloodtypecheck,setBloodCheck]=useState(false)
  // const [signal,setSignal]=useState(false)
  const [inputs, setInputs] = useState({
    direct_title: "",
    direct_context: "",
  });

  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/card/requests/" +
          // "http://localhost:8003/requests/"
          sessionStorage.getItem("boardId")
      )

      .then(function (response) {
        // console.log(response);
        const firstinputs = {
          request_context: response.data.contents,
          request_title: response.data.title,
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
  
  };


  const senddata = () => {
    if (inputs.request_title === "") {
      successAlert.errorAlert("제목을 넣어주세요");
    } else if (inputs.request_context === "") {
      successAlert.errorAlert("내용을 넣어주세요");
    } else {
      axios
        .put(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/card/requests/requestItem/" +
            // "http://localhost:8003/requests/requestItem/"
            +sessionStorage.getItem("boardId"),
          {
            userId: sessionStorage.getItem("userId"),
            title: inputs.request_title,
            contents: inputs.request_context,
            image: getIMG,
            completeStatus: restatus,
          }
        )
        .then(function (response) {
          console.log(response);
        });
        successAlert.successAlert("게시글이 수정되었습니다.");
      props.addPage("헌혈증_기부");
    }
  };

  const getfilename = (value) => {
    // console.log("wow",value)
    setIMG(value);
  };
  return (
    <div className="Board-rewrite-container">
      {console.log("rewrite", inputs)}
      <div className="Board-rewrite-nav-container">
        <div className="Board-rewrite-nav-class">
          <Menu_left_nav
            name={"헌혈증 기부"}
            imgname={CARDDONATION}
          ></Menu_left_nav>
        </div>
        <div className="Board-rewrite-nav-goback">
          <img
            className="Board-rewrite-goback-bntimg-class"
            onClick={() => props.addPage("헌혈증_기부")}
            src={GOBACKBTN}
          ></img>
        </div>
      </div>
      <div className="Board-rewrite-content-container">
        <div className="Board-rewrite-content-class">
          <div className="Board-rewrite-card-class">
            <div className="Board-rewrite-card-total">
              <div className="Board-rewrite-card-nav-class">
                <input
                  name="request_title"
                  className="Board-rewrite-card-title-class"
                  value={inputs.request_title}
                  onChange={onChange}
                ></input>
              </div>

              <div className="Board-rewrite-card-context-class">
                <textarea
                  name="request_context"
                  className="Board-rewrite-card-context-input"
                  value={inputs.request_context}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="Board-rewrite-card-footer-class"></div>
            </div>
          </div>
          <div className="Board-rewrite-footer-container">
            <div className="Board-rewrite-footer-upload-container">
              <div className="Board-rewrite-footer-upload">
                <S3Upload getfilename={getfilename} />
              </div>
            </div>
            <div className="Board-rewrite-status-container">
              {restatus === false ? (
                <div className="Board-rewrite-status-class">
                  <div className="Board-rewrite-status-ongoging">
                    <img className="Board-rewrite-status-img" src={BLOODDROP} />
                    진행중
                  </div>
                  <div
                    className="Board-rewrite-status-stop"
                    onClick={() => setRestatus(true)}
                  >
                    <img className="Board-rewrite-status-img" src={BLOODDROP} />{" "}
                    진행완료
                  </div>
                </div>
              ) : (
                <div className="Board-rewrite-status-class">
                  <div
                    className="Board-rewrite-status-ongogingnot"
                    onClick={() => setRestatus(false)}
                  >
                    <img className="Board-rewrite-status-img" src={BLOODDROP} />
                    진행중
                  </div>
                  <div className="Board-rewrite-status-stopnot">
                    <img className="Board-rewrite-status-img" src={BLOODDROP} />{" "}
                    진행완료
                  </div>
                </div>
              )}
              {/* {console.log(restatus)} */}
            </div>

            <div className="Board-rewrite-btn-container">
              <div className="Board-rewrite-btn-class" onClick={senddata}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Board_write);
