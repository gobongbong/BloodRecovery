import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Change_info.css";
import BRONZE from "../../Img/Grade/4_bronze.png";
import SIVER from "../../Img/Grade/3_silver.png";
import GOLD from "../../Img/Grade/2_gold.png";
import VIP from "../../Img/Grade/1_vip.png";
import WRITEWHITEIMG from "../../Img/DirectedIMG/WRITE_WHITE.png";
import Common_Button_IMG from "../../component/Common/Button/Common_Button_IMG";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
// import { addPage } from "../Modalmove/subscribers/action";
// import { connect } from "react-redux";
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import S3Upload from "../Common/Function/S3fileUpload";
import BLOODICON from "../../Img/광기1.png";
import BEFORELOGIN from "../../Img/MainIMG/beforelogin.png";
import * as successAlert from "../Common/MakeAlert/successAlert.js"
const gradefunction = (Grade) => {
  if (Grade === 1)
    //BRONZE 예정
    return <img className="Change-img-userimg" src={BRONZE}></img>;
  else if (Grade === 2)
    //SIVER 예정
    return <img className="Change-img-userimg" src={SIVER}></img>;
  else if (Grade === 3)
    //GOLD 예정
    return <img className="Change-img-userimg" src={GOLD}></img>;
  //레벨4 VIP
  else return <img className="Change-img-userimg" src={VIP}></img>;
};

function Change_info(props, getData) {
  const [user, setUser] = useState();
  const [getIMG, setIMG] = useState(null);
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [nicknamesameCheck, setNicknamesameCheck] = useState(false);
  const [rerender,setrerender]=useState(false);
  const [inputs, setInputs] = useState({
    nickname: "",
    profile: "",
  });
  var nicknameEXP = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9_-]{2,20}$/;
  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...inputs,
      [name]: value,
    };
    //만든 변수를 seInput으로 변경해준다.
    if (name === "nickname") {
      // console.log("닉네임 유효성", nicknameEXP.test(e.target.value));
      setNicknameCheck(nicknameEXP.test(e.target.value));
    }
    setInputs(nextInputs);


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
        const fistinput = {
          nickname: response.data.nickname,
          profile: "",

        }
        setInputs(fistinput)
      });
  }, [rerender]);

  const senddata = () => {
    //변경이없으면 프로필만변경
    if (inputs.nickname === user?.nickname) {
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
        successAlert.successAlert("개인정보가 수정되었습니다.");
      setrerender(!rerender)

    }
    else {
      //변경이 있으면 체크하고 전송
      if (nicknameCheck === true && nicknamesameCheck === true) {
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
        successAlert.successAlert("개인정보가 수정되었습니다.");
        setrerender(!rerender)

      }
      else { successAlert.errorAlert("중복확인을 해주세요") }
    }

  }

  const nicknameoverlap = () => {
    if (nicknameEXP.test(inputs.nickname) === false) {
      successAlert.errorAlert("닉네임 양식에 맞춰 입력해주세요.");
    } else if (nicknameEXP.test(inputs.nickname) === true) {
      axios
        .get(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/nicknameCheck/" +
          inputs.nickname
        )
        .then(function (res) {
          //false면 가입불가능 true면 가입가능
          console.log(res.data.result);
          if (res.data.result === true) {
            successAlert.successAlert("사용가능한 닉네임입니다.");
            setNicknamesameCheck(nicknameEXP.test(inputs.nickname));
          
          }
          else {
            successAlert.errorAlert("중복된 닉네임입니다.")
          }
        });
    }


  };
  return (
    <div className="Change-main-container-class">
      <div className="Change-main-class">
        <div className="Change-info-nav-container">
          <Menu_left_nav
            name={"나의정보수정"}
            imgname={BLOODICON}
          ></Menu_left_nav>
        </div>
        <div className="Change-info-goback-bntimg-class">
          <img
            className="Change-info-nav-goback"
            onClick={() => props.addPage("마이페이지")}
            src={GOBACKBTN}
          ></img>
        </div>
      </div>
      <div className="Change-info-profilecontainer">
        <div className="Change-info-profile">
          <img className="Mypage-main-profileimg" src={user?.profile===null?BEFORELOGIN:user?.profile}></img>
        </div>
        <div className="Mypage-profile-footer-upload">
          <S3Upload getfilename={getfilename} />
        </div>
        <div className="Change-info-bigbig">
        <div className="Change-info-big">
        <div className="Change-info-usericon-class">{gradefunction(user?.level)}</div>
        <div className="Change-info-nickname">{user?.nickname}</div>
        </div>
        </div>
        <div className="nickname-change">
          <div>
            변경 할 닉네임:
            <input
              name="nickname"
              className="Mypage-rewrite-card-title-class"
              value={inputs.nickname}
              onChange={onChange}
            ></input>
            <div className="Change-info-samecheckbtn" onClick={nicknameoverlap}>중복확인</div>
            <div className="Change-info-nicknamerule" style={nicknameCheck === true ? { color: "green" } : { color: "red" }}>영문, 한글, 숫자 '-' 포함 2~20자 이내</div>
          </div>
        </div>

        <div className="Mypage-main-nav2"></div>
        {/* <div className="Mypage-main-username">{user?.name}</div>
      <div className="Mypage-main-userid">{user?.userId}</div> */}
      </div>
      <div className="Change-info-footer-container">
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
