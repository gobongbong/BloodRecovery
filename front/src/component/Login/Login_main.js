import React, { useState, useEffect } from "react";
import "./Login_main.css";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import IDIMG from "../../Img/login.png";
import PASSIMG from "../../Img/password.png";
import blood from "../../Img/blood.png";
import axios from "axios";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import * as successAlert from "../Common/MakeAlert/successAlert.js"
const Login_main = (props) => {


  const [inputs, setInputs] = useState({
    loin_id: "",
    loin_password: "",
  });

  const sendValue = (text) => {
    props.loginsuccess(text);
  };
  const onSendClick = () => {
    console.log(inputs);
    const CryptoJS = require("crypto-js");
    const encPassword = CryptoJS.AES.encrypt(
      inputs.loin_password,
      "longhair"
    ).toString();
    axios
      .post(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/login",
        { userId: inputs.loin_id, password: encPassword },
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      )
      .then(function (res) {
        console.log(res.data.result);

        if (res.data.result === true) {
          successAlert.successAlert("로그인성공");
          sessionStorage.setItem("userId", inputs.loin_id);
          console.log(sessionStorage.getItem("userId"));
          sendValue("성공");
        } else if (res.data.result === false) {
          successAlert.errorAlert("로그인 실패");
        }
      });
  };

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

  return (
    <div className="Login-main-class">
      <div className="Login-main-container-class">
        <Menu_left_nav name={"로그인"} imgname={blood}></Menu_left_nav>
      </div>
      <div className="Login-main-input-container-class">
        <div className="Login-main-input-id-class">
          <img className="Login-main-idimg-class" src={IDIMG} />

          <input
            className="Login-main-input-box-class"
            type="text1"
            name="loin_id"
            onChange={onChange}
          ></input>
        </div>
        <div className="Login-main-input-password-class">
          <img className="Login-main-idimg-class" src={PASSIMG} />
          <input
            type="password"
            className="Login-main-input-box-class"
            name="loin_password"
            onChange={onChange}
          ></input>
        </div>
      </div>
      <div className="Login-main-btn-container-class">
        <div className="Login-main-btn-class">
          <div className="Login-Common-Button-class" onClick={onSendClick}>
            <div className="Login-Common-Button-text-class">로그인</div>
          </div>
        </div>
      </div>
      <div className="Login-main-find-container">
        <div
          className="Login-main-find-class"
          onClick={() => props.addPage("아이디비밀번호찾기")}
        >
          아이디 찾기 / 비밀 번호
        </div>
      </div>
      <div className="Login-main-joinbtn-container">
        <div className="Login-Common-joinbtn-class">
          <div
            className="Login-Common-joinbtn-text-class"
            onClick={() => props.addPage("회원가입")}
          >
            회원가입
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
export default connect(mapStateToProps, mapDispatchToProps)(Login_main);
