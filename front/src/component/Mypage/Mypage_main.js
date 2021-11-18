import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Mypage_main.css";
import BRONZE from "../../Img/Grade/4_bronze.png";
import SIVER from "../../Img/Grade/3_silver.png";
import GOLD from "../../Img/Grade/2_gold.png";
import VIP from "../../Img/Grade/1_vip.png";
import { addPage } from "../../component/Modalmove/subscribers/action";
import { connect } from "react-redux";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import BEFORELOGIN from "../../Img/MainIMG/beforelogin.png";
import POCKETICON from "../../Img/pocket.png";
const gradefunction = (Grade) => {
  if (Grade === 1)
    //BRONZE 예정
    return <img className="Mypage-img-userimg" src={BRONZE}></img>;
  else if (Grade === 2)
    //SIVER 예정
    return <img className="Mypage-img-userimg" src={SIVER}></img>;
  else if (Grade === 3)
    //GOLD 예정
    return <img className="Mypage-img-userimg" src={GOLD}></img>;
  //레벨4 VIP
  else return <img className="Mypage-img-userimg" src={VIP}></img>;
};

function Mypage_main(props, getData) {
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/info/" +
        sessionStorage.getItem("userId")
      )
      .then(function (response) {
        setUser(response.data);
        console.log("rr", sessionStorage.getItem("userId"));
      });
  }, []);

  function movepage(text) {
    props.addPage(text);
  }

  return (
    <div className="Mypage-main-container-class">
      <div className="Mypage-main-class">
        <div className="Mypage-main-Header-container-class">
          <Menu_left_nav name={"마이페이지"}  imgname={POCKETICON}></Menu_left_nav>
        </div>
      </div>
      <div className="Mypage-main-nav-container"></div>
      <div className="Mypage-main-profile">
        <img className="Mypage-main-profileimg" src={user?.profile===null?BEFORELOGIN:user?.profile}></img>
      </div>
      <div className="Mypage-usericon-class">{gradefunction(user?.level)}</div>
      <div className="Mypage-main-nickname">{user?.nickname}</div>
      <div className="Mypage-main-nav2"></div>
      <div className="Mypage-main-username">{user?.name}</div>
      <div className="Mypage-main-userid">{user?.userId}</div>
      <div
        className="Mypage-info-change"
        onClick={() => movepage("내정보수정")}
      >
        내정보수정
      </div>
      {/* {user.point} */}
      {/* <img className="profile-img2" src={otherrank.profile}></img> */}
      <div
        className="Mypage-bloodpocket-button"
        onClick={() => movepage("내_지갑")}
      >
        헌혈증 지갑
      </div>
      <div
        className="Mypage-list-button"
        onClick={() => movepage("나의게시물")}
      >
        내가 요청한 기부
      </div>
      <div className="Mypage-point-button" onClick={() => movepage("포인트")}>
        {user?.point}
        <b>P</b>
        <p>포인트 내역 확인하기</p>
      </div>
      <div className="Mypage-withdrawal" onClick={() => movepage("회원탈퇴")}>
        회원탈퇴
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Mypage_main);
