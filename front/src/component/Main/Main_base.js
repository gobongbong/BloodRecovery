import React, { useState, useEffect, useCallback } from "react";
import Header_nav from "../Common/Header/Header_nav";
import Main_rank from "./Main_rank";
import UseLocalHook from "../Common/Function/UseLocalHook";
import Main_title from "./Main_title_text";
import Main_Button from "../Common/Button/Main_Button";
import ReactModal from "react-modal";
import Board_main from "../Board/Board_main";
import Directed_main from "../Directed/Directed_main";
import Join_main from "../Join/Join_main";
import Login_main from "../Login/Login_main";
import Notice_main from "../Notice/Notice_main";
import Rank_main from "../Rank/Rank_main";
import Bloodhouse_main from "../Bloodhouse/Bloodhouse_main";
import Header_nav_login from "../Common/Header/Header_nav_login";
import Directed_write from "../Directed/Directed_write";
import Board_write from "../Board/Board_write";
import Notice_write from "../Notice/Notice_write";
import "./Main_base.css";
import Mypage_main from "../Mypage/Mypage_main";
import Directed_inquire from "../Directed/Directed_inquire";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import Board_inquire from "../Board/Board_inquire";
import Notice_inquire from "../Notice/Notice_inquire";
import Bloodpocket_card from "../Mypage/Bloodpocket_card";
import Bloodpocket_main from "../Mypage/Bloodpocket";
import Point_main from "../Mypage/Point_main";
import Change_info from "../Mypage/Change_info";
import Directed_rewrite from "../Directed/Directed_rewrite";
import Board_rewrite from "../Board/Board_rewrite";
import Notice_rewrite from "../Notice/Notice_rewrite";
import Login_find from "../Login/Login_find";
import Mypage_myboard from "../Mypage/Mypage_myboard_main";
import Message from "../Message/Message";
import Message_read from "../Message/Message_read";

var text = "";
var sendid;

function Main_base(props) {
  const modal_style = {
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
      top: 100,
      bottom: 100,
      zIndex: 0,
      padding: 10,
    },
  };

  //새로고침해도 모달창이 안꺼지도록 하는 함수
  const [modalIsOpen, setModalIsOpen] = UseLocalHook("true", false);
  //새로고침해도 모달창에서 불러온 컴포넌트가 안꺼지게 하는 함수
  const [modal, setmodal] = useState(
    () => JSON.parse(window.localStorage.getItem("modal")) || 0
  );

  useEffect(() => {
    window.localStorage.setItem("modal", JSON.stringify(modal));
  }, [modal]);
  const [testvalue, settestvalue] = useState(true);
  const getsetValue = (text) => {
    props.addPage(text);
    setModalIsOpen(true);
  };
  const getsetValue1 = (text) => {
    console.log(text);
    alert("회원가입이 완료되었습니다.");
    setmodal("로그인");
  };
  const getsetValue2 = (getData) => {
    console.log("여기로~", getData);
    //setGetidValue(getData)
    sendid = getData;
    console.log("입력아이디", sendid);
    // datesent(getData)
    setmodal("지정헌혈조회");
  };
  const getsetValue3 = () => {
    console.log("여기로~");

    setmodal("지정헌혈");
  };

  const logoutsuccess = () => {
    //로그인수정 중복된값을 넣어서 새로 렌더링이안되었던거같음
    settestvalue(!testvalue);
    console.log("logout");
  };
  const loginsuccess = (text) => {
    console.log(text);
    setModalIsOpen(false);
  };

  function movepage(text) {
    props.addPage(text);
    setModalIsOpen(true);
  }

  return (
    <div className="Main-base-class">
      <div className="Main-base-Header-container-class">
        <div className="Main-base-Header-class">
          {sessionStorage.getItem("userId") === null ? (
            <Header_nav value={text} getsetValue={getsetValue}></Header_nav>
          ) : (
            <Header_nav_login
              logoutsuccess={logoutsuccess}
              getsetValue={getsetValue}
            ></Header_nav_login>
          )}
          {/*<div className="test1" onClick={() => onChageClick2(getValue)}> emry</div>
                    {console.log("test:"+text+"get:"+getValue)}*/}
        </div>
      </div>
      <div className="Main-base-title-container-class">
        <div className="Main-base-title-class">
          <Main_title></Main_title>
        </div>
      </div>
      <div className="Main-base-rank-container-class">
        {/* <Main_rank value={text} getsetValue={getsetValue}>000000000</Main_rank> */}
        {/* <div className="Main-base-rank-class" onClick={(e)=>{onChageClick("랭킹",e)}}> */}
        <div className="Main-base-rank-class">
          <Main_rank getsetValue={getsetValue}></Main_rank>
        </div>
      </div>
      <div className="Main-base-list-container-class">
        <div className="Main-base-list-class">
          {/*<Main_list></Main_list>*/}
          <div
            className="Main-base-list-button"
            onClick={() => movepage("헌혈증_기부")}
          >
            <Main_Button name={"헌혈증 기부"}></Main_Button>
          </div>
          <div
            className="Main-base-list-button"
            onClick={() => movepage("지정헌혈")}
          >
            <Main_Button name={"지정헌혈"}></Main_Button>
          </div>
          <div
            className="Main-base-list-button"
            onClick={() => movepage("헌혈의_집_예약")}
          >
            <Main_Button name={"헌혈의 집 예약"}></Main_Button>
          </div>

          <div
            className="Main-base-list-button"
            onClick={() => movepage("공지사항")}
          >
            <Main_Button name={"공지사항"}></Main_Button>
          </div>
        </div>
      </div>

      <ReactModal
        style={modal_style}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {
          {
            헌혈증_기부: <Board_main getsetValue2={getsetValue2}></Board_main>,
            헌혈증요청조회: <Board_inquire />,
            헌혈증_글쓰기: <Board_write></Board_write>,
            헌혈증_수정: <Board_rewrite />,
            나의게시물: <Mypage_myboard />,
            지정헌혈: (
              <Directed_main getsetValue2={getsetValue2}></Directed_main>
            ),
            지정헌혈조회: (
              <Directed_inquire
                getsetValue3={getsetValue3}
                id={sendid}
              ></Directed_inquire>
            ),
            지정헌혈_글쓰기: <Directed_write></Directed_write>,
            지정헌혈_수정: <Directed_rewrite />,

            헌혈의_집_예약: <Bloodhouse_main></Bloodhouse_main>,
            마이페이지: <Mypage_main></Mypage_main>,

            공지사항: <Notice_main></Notice_main>,
            공지사항조회: <Notice_inquire></Notice_inquire>,
            공지사항_글쓰기: <Notice_write></Notice_write>,
            내_지갑_카드조회: <Bloodpocket_card />,
            공지사항_수정: <Notice_rewrite />,
            내_지갑: <Bloodpocket_main />,
            포인트: <Point_main />,
            내정보수정: <Change_info />,
            로그인: <Login_main loginsuccess={loginsuccess}></Login_main>, //.....
            메시지: <Message />,
            메시지상세조회: <Message_read />,
            아이디비밀번호찾기: <Login_find />,
            회원가입: <Join_main></Join_main>,

            랭킹: <Rank_main></Rank_main>,
          }[JSON.parse(window.sessionStorage.getItem("last"))]
        }
      </ReactModal>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    page: state.page,
    index: state.index,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addPage: (text) => dispatch(addPage(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main_base);
