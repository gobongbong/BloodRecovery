import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Change_info.css";
import BRONZE from "../../Img/Grade/4_bronze.png";
import SIVER from "../../Img/Grade/3_silver.png";
import GOLD from "../../Img/Grade/2_gold.png";
import VIP from "../../Img/Grade/1_vip.png";
import WRITEWHITEIMG from "../../Img/DirectedIMG/WRITE_WHITE.png";
import Common_Button_IMG from "../../component/Common/Button/Common_Button_IMG";
import POINTICON from "../../Img/point.png";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
// import { addPage } from "../Modalmove/subscribers/action";
// import { connect } from "react-redux";
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
import { connect, ReactReduxContext } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import S3Upload from "../Common/Function/S3fileUpload";
import BLOODICON from "../../Img/광기1.png";
import BLOODGIF from "../../Img/광기움짤.gif";

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

function Change_info(props, getData) {
  const [user, setUser] = useState();
  const [getIMG, setIMG] = useState(null);
  const [inputs, setInputs] = useState({
    nickname: "",
    profile: "",
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
    console.log(inputs);
  };

  const getfilename = (value) => {
    // console.log("wow",value)
    setIMG(value);
  };

  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/info/" +
          sessionStorage.getItem("userId")
      )
      .then(function (response) {
        setUser(response.data);
        console.log("rr", response);
      });
  }, []);

  const senddata = () => {
    axios
      .put(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/info",
        {
          userId: sessionStorage.getItem("userId"),
          nickname: inputs.nickname,
          profile: getIMG,
        }
      )
      .then(function (response) {
        // console.log(response);
      });
    alert("개인정보가 수정되었습니다.");
  };

  // function movepage(text) {
  //   props.addPage(text);
  // }

  // function () {
  return (
    <div className="Mypage-main-container-class">
      <div className="Mypage-main-class">
        <div className="Mypage-main-Header-container-class">
          {/* {console.log(props.index)} */}
          <Menu_left_nav
            name={"나의정보수정"}
            imgname={BLOODICON}
            // imgname={BLOODGIF}
          ></Menu_left_nav>
        </div>
        <div className="Mypage-rewrite-nav-goback">
          <img
            className="Mypage-rewrite-goback-bntimg-class"
            onClick={() => props.addPage("마이페이지")}
            src={GOBACKBTN}
          ></img>
        </div>
      </div>
      <div className="Mypage-main-nav-container"></div>
      <div className="Mypage-main-profile">
        <img className="Mypage-main-profileimg" src={user?.profile}></img>
      </div>
      <div className="Mypage-profile-footer-upload">
        <S3Upload getfilename={getfilename} />
      </div>

      <div className="Mypage-usericon-class">{gradefunction(user?.level)}</div>
      <div className="Mypage-main-nickname">{user?.nickname}</div>
      <div className="nickname-change">
        <div>
          변경 할 닉네임:
          <input
            name="nickname"
            className="Mypage-rewrite-card-title-class"
            value={inputs.nickname}
            onChange={onChange}
          ></input>
        </div>
      </div>

      <div className="Mypage-main-nav2"></div>
      {/* <div className="Mypage-main-username">{user?.name}</div>
      <div className="Mypage-main-userid">{user?.userId}</div> */}

      <div className="Mypage-rewrite-footer-container">
        <div className="Mypage-rewrite-btn-container">
          <div className="Mypage-rewrite-btn-class" onClick={senddata}>
            <Common_Button_IMG
              name={"수정완료"}
              imgname={WRITEWHITEIMG}
            ></Common_Button_IMG>
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

export default connect(mapStateToProps, mapDispatchToProps)(Change_info);
