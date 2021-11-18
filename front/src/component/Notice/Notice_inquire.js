import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import CARDDONATION from "../../Img/CARDDONATION.png";
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
import ADMIN from "../../Img/Grade/0_admin.png";
import axios from "axios";
import { connect, ReactReduxContext } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import "./Notice_inquire.css";

const Notice_inquire = (id) => {
  const [getData, setGetData] = useState();

  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/notice/" +
          // "http://localhost:8005/"
          sessionStorage.getItem("boardId")
      )

      .then(function (response) {
        setGetData(response);
        // console.log("response1", response);
      });
  }, []);

  const deleteData = () => {
    axios
      .delete(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/notice/" +
          // "http://localhost:8005/"
          sessionStorage.getItem("boardId")
      )

      .then(function (response) {
        alert("게시글이 삭제되었습니다.");
        id.addPage("공지사항");
        // console.log("response", response);
      });
  };

  const putPoint = () => {
    // console.log(sessionStorage.getItem("userId"));
    axios
      .put(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/point",
        {
          userId: sessionStorage.getItem("userId"),
          plusPoint: 5,
          minusPoint: 0,
          breakdown: "프로모션 참여",
        }
      )
      .then(function (response) {
        alert("프로모션 참여로 5포인트가 지급되었습니다.");
        id.addPage("공지사항");
        // console.log("response", response);
      });
  };

  const postPro = () => {
    // console.log(sessionStorage.getItem("userId"));
    axios
      .post(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8005/" +
          sessionStorage.getItem("boardId") +
          "?userId=" +
          sessionStorage.getItem("userId")
      )
      .then(function (response) {
        if (response.data == true) {
          {
            putPoint();
          }
        } else {
          alert("이미 참여한 프로모션입니다.");
          id.addPage("공지사항");
          console.log("response", response);
        }
      });
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
    if (level === 0) return ADMIN;
  };

  return (
    <div className="Notice-inquire-container">
      <div className="Notice-inquire-nav-container">
        <div className="Notice-inquire-nav-class">
          <Menu_left_nav
            name={"공지사항"}
            imgname={CARDDONATION}
          ></Menu_left_nav>
          {/* {console.log(id.id)} */}
        </div>
        <div className="Notice-inquire-nav-goback">
          <img
            className="Notice-inquire-goback-bntimg-class"
            onClick={() => id.addPage("공지사항")}
            src={GOBACKBTN}
          ></img>
        </div>
      </div>
      <div className="Notice-inquire-content-container">
        <div className="Notice-inquire-content-class">
          <div className="Notice-inquire-card-class">
            <div className="Notice-inquire-card-total">
              <div className="Notice-inquire-card-nav-class">
                <div className="Notice-inquire-card-title-class">
                  {getData?.data.title}
                </div>
                <div className="Notice-inquire-card-data-class">
                  {dividedate(getData?.data.date)}
                </div>
              </div>
              <div className="Notice-inquire-card-info-class">
                <div className="Notice-inquire-card-writer-container">
                  <img
                    src={levelIMG(getData?.data.writerLevel)}
                    className="Notice-inquire-card-writer-icon"
                  ></img>
                  <div className="Notice-inquire-card-writername-class">
                    {getData?.data.writerNickname}
                  </div>
                </div>
              </div>
              <div className="Notice-inquire-card-context-class">
                <pre className="Notice-inquire-contents">
                  {getData?.data.contents}{" "}
                </pre>
              </div>

              <div className="Notice-inquire-card-context-img-class">
                <div className="Notice-inquire-card-context-margin">
                  <a
                    href={getData?.data.imageUrl}
                    onClick={postPro}
                    target="_blank"
                  >
                    <img
                      src={getData?.data.image}
                      className="Notice-inquire-cardset-img"
                    />
                  </a>
                  {/* 클릭했을때 5포인트 적립. */}
                </div>
              </div>
            </div>
          </div>
          <div className="Notice-inquire-footer-container">
            {getData?.data.writerUserId === sessionStorage.getItem("userId") ? (
              <div>
                <div className="Notice-inquire-footer-mypost">
                  <div
                    className="Notice-inquire-footer-delete"
                    onClick={deleteData}
                  >
                    삭제
                  </div>
                  <div
                    className="Notice-inquire-footer-repost"
                    onClick={() => id.addPage("공지사항_수정")}
                  >
                    수정
                  </div>
                </div>
              </div>
            ) : null}

            <div className="Notice-inquire-default-footer-container">
              <div className="Notice-inquire-default-footer-info1-class">
                피로회복 짱
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

export default connect(mapStateToProps, mapDispatchToProps)(Notice_inquire);
