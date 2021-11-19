import React, { useEffect, useState } from "react";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import CARDDONATION from "../../Img/CARDDONATION.png";
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
// import Common_Button_IMG from "../Common/Button/Common_Button_IMG";
// import Board_BUTTON_IMG from "../../Img/BoardIMG/BoardIMGWHITE.png";

import Board_BUTTON_IMG from "../../Img/CARDDONATIONWHITE.png";
import Common_Button_IMG from "../Common/Button/Common_Button_IMG";
import ReactModal from "react-modal";
import BLOODDROPIMG from "../../Img/DirectedIMG/blood-drop.png";
import BRONZE from "../../Img/Grade/4_bronze.png";
import SIVER from "../../Img/Grade/3_silver.png";
import GOLD from "../../Img/Grade/2_gold.png";
import VIP from "../../Img/Grade/1_vip.png";
import axios from "axios";
import Bloodpocket from "../Mypage/Bloodpocket";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import "./Board_inquire.css";
import * as successAlert from "../Common/MakeAlert/successAlert.js"

const Board_inquire = (id) => {
  const [getData, setGetData] = useState();
  const [modalIsOpen, setModalIsOpen] = useState();
  //새로고침해도 모달창에서 불러온 컴포넌트가 안꺼지게 하는 함수

  const [getDonation, setGetDonation] = useState([]);
  const modal_style1 = {
    overlay: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0,0 )",
    },
    content: {
      left: 350,
      right: 350,
      top: 80,
      bottom: 80,
      zIndex: 0,
      padding: 10,
    },
  };
  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/card/requests/" +
          // "http://localhost:8003/requests/"
          sessionStorage.getItem("boardId")
      )

      .then(function (response) {
        setGetData(response);
        
      });
  }, []);

  const deleteData = () => {
    axios
      .delete(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/card/requests/requestItem/" +
          // "http://localhost:8003//requests/requestItem/"
          sessionStorage.getItem("boardId")
      )

      .then(function (response) {
        successAlert.successAlert("게시글이 삭제되었습니다.");
        id.addPage("헌혈증_기부");
      });
  };

  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/card/requests/requestItem/" +
          // "http://localhost:8003/requests/requestItem/"
          sessionStorage.getItem("boardId") +
          "/donations"
      )
      .then(function (response) {
        setGetDonation(response);

      });
  }, [getDonation]);
  //실시간 breakdown

  const donationlist = (donation) => {
    return <div>{donation.nickname}님이 헌혈증을 기부하셨습니다!</div>;
  };

  const dividedate = (inputdate) => {
    var redate = "";
    for (var i in inputdate) {
      if (inputdate[i] == "T") break;

      redate = redate + inputdate[i];
    }
    return redate;
  };
  const levelIMG = (level) => {
    if (level === 1) return BRONZE;
    else if (level === 2) return SIVER;
    else if (level === 3) return GOLD;
    else if (level === 4) return VIP;
  };
  ///기부하기//////////////////
  const endsg = () => {
    setModalIsOpen(false);
  };
  const beDonation = () => {
    if (sessionStorage.getItem("userId") == null) {
      successAlert.errorAlert("로그인 후 기부가 가능합니다!");
    } else {
      setModalIsOpen(true);
      // id.getValue();
    }
  };

  return (
    <div className="Board-inquire-container">
      <ReactModal
        style={modal_style1}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {" "}
        <Bloodpocket
          onbtn={"true"}
          number={getData?.data.userId}
          endsg={endsg}
        ></Bloodpocket>{" "}
      </ReactModal>
      <div className="Board-inquire-nav-container">
        <div className="Board-inquire-nav-class">
          <Menu_left_nav
            name={"헌혈증 기부"}
            imgname={CARDDONATION}
          ></Menu_left_nav>
          {/* {console.log(id.id)} */}
        </div>
        <div className="Board-inquire-nav-goback">
          <img
            className="Board-inquire-goback-bntimg-class"
            onClick={() => id.addPage(sessionStorage.getItem("lastbefore"))}
            src={GOBACKBTN}
          ></img>
        </div>
      </div>
      <div className="Board-inquire-content-container">
        <div className="Board-inquire-content-class">
          <div className="Board-inquire-card-class">
            <div className="Board-inquire-card-total">
              <div className="Board-inquire-card-nav-class">
                <div className="Board-inquire-card-title-class">
                  {getData?.data.title}
                </div>
                <div className="Board-inquire-card-data-class">
                  {dividedate(getData?.data.requestDate)}
                </div>
              </div>
              <div className="Board-inquire-card-info-class">
                <div className="Board-inquire-card-writer-container">
                  <img
                    src={levelIMG(getData?.data.level)}
                    className="Board-inquire-card-writer-icon"
                  ></img>
                  <div className="Board-inquire-card-writername-class">
                    {getData?.data.nickname}
                  </div>
                </div>
              </div>
              <div className="Board-inquire-card-context-class">
                <pre className="Board-inquire-card-context-classpre">{getData?.data.contents}</pre>
              </div>
              <div className="Board-inquire-card-context-img-class">
                <div className="Board-inquire-card-context-margin">
                  <img
                    src={getData?.data.image}
                    className="Board-inquire-cardset-img"
                  />
                </div>
              </div>

              <div className="Board-inquire-card-footer-class">
                <div className="Board-inquire-card-footer-status">
                  <img
                    src={BLOODDROPIMG}
                    className="Board-inquire-card-footer-statueIMG"
                  ></img>
                  <div className="Board-inquire-card-footer-statustext">
                    <div className="Board-inquire-card-footer-statustext">
                      {/* {writeStatue(getData?.data.completeStatus)} */}
                      {getData?.data.completeStatus === false ? (
                        <p className="Board-card-nav-userstatus-p-class-inquire">
                          {getData?.data.donationCount}/
                          {getData?.data.requestCount}
                        </p>
                      ) : (
                        <p className="Board-card-nav-userstatus-p-class-inquire2">
                          완료
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Board-inquire-footer-container">
            {getData?.data.userId === sessionStorage.getItem("userId") ? (
              <div>
                <div className="Board-inquire-footer-mypost">
                  <div
                    className="Board-inquire-footer-delete"
                    onClick={deleteData}
                  >
                    삭제
                  </div>
                  <div
                    className="Board-inquire-footer-repost"
                    onClick={() => id.addPage("헌혈증_수정")}
                  >
                    수정
                  </div>
                </div>
              </div>
            ) : null}

            {getData?.data.completeStatus === false ? (
              <div className="Board-inquire-default-footer-btn-container">
                <div
                  className="Board-inquire-default-footer-btn-class"
                  onClick={beDonation}
                >
                  <Common_Button_IMG
                    name={"기부하기"}
                    imgname={Board_BUTTON_IMG}
                  ></Common_Button_IMG>
                </div>
              </div>
            ) : null}

            <div className="Board-inquire-default-footer-container">
              <div className="Board-inquire-default-footer-info1-class">
                소중한 기부 감사합니다 :)
              </div>
            </div>

            <div className="Board-inquire-footer-applicant">
              <div className="donation-list">
                {getDonation.data?.map((list) => donationlist(list))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Board_inquire);
