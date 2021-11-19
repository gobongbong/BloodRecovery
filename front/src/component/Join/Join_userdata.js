import react, { useCallback, useState } from "react";
import "./Join_userdata.css";
import Common_Button from "../Common/Button/Common_Button";
import axios from "axios";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
const Join_userdata = (props) => {
  const [btnnickname, setBtnNickname] = useState(false);
  const [btnid, setBtnid] = useState(false);
  const [btnregister, setbtnregister] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordconfirmCheck, setPasswordconfirmCheck] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [resister1Check, setResister1Check] = useState(false);
  const [resister2Check, setResister2Check] = useState(false);
  const [inputs, setInputs] = useState({
    join_nickname: "",
    join_id: "",
    join_password: "",
    join_passwordconfirm: "",
    join_name: "",
    join_register1: "",
    join_register2: "",
  });
  var nicknameEXP = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9_-]{2,20}$/;
  var idEXP = /^[a-zA-Z0-9_]{5,20}$/;
  var passwordEXP = /^[a-zA-Z0-9~!@#$%^&*()_]{8,16}$/;
  var nameEXP = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
  var register1EXP = /^[0-9]{6}$/;
  var register2EXP = /^[0-9]{7}$/;
  var encPassword = "";
  var encRegister = "";

  const {
    join_nickname,
    join_id,
    join_password,
    join_passwordconfirm,
    join_name,
    join_register1,
    join_register2,
  } = inputs;
  const join_agreement = false;
  const onChange1 = (e) => {
    setAgreement(!agreement);
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

    console.log(inputs);
    if (name === "join_nickname") {
      console.log("닉네임 유효성", nicknameEXP.test(e.target.value));
      setNicknameCheck(nicknameEXP.test(e.target.value));
    } else if (name === "join_id") {
      console.log("아이디 유효성", idEXP.test(e.target.value));
      setIdCheck(idEXP.test(e.target.value));
    } else if (name === "join_password") {
      console.log("비밀번호 유효성", passwordEXP.test(e.target.value));
      setPasswordCheck(passwordEXP.test(e.target.value));
    } else if (name === "join_passwordconfirm") {
      console.log("비밀번호확인 유효성", join_password);
      //RegExp라는 형식이 따로있다.

      // const passwordconfirmEXP =new RegExp(join_password)
      console.log("비밀번호확인 유효성", join_password === e.target.value);
      setPasswordconfirmCheck(join_password === e.target.value);
    } else if (name === "join_name") {
      console.log("이름 유효성", nameEXP.test(e.target.value));
      setNameCheck(nameEXP.test(e.target.value));
    } else if (name === "join_register1") {
      console.log("주민번호1 유효성", register1EXP.test(e.target.value));
      setResister1Check(register1EXP.test(e.target.value));
    } else if (name === "join_register2") {
      console.log("주민번호2 유효성", register2EXP.test(e.target.value));
      setResister2Check(register2EXP.test(e.target.value));
    }
  };
  const idoverlap = () => {
    if (idEXP.test(join_id) === false) {
      alert("아이디 양식에 맞춰 입력해주세요.");
    } else if (idEXP.test(join_id) === true) {
      axios
        .get(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/idCheck/" +
            join_id
        )
        .then(function (res) {
          //false면 가입불가능 true면 가입가능
          console.log(res.data.result);
          if (res.data.result === true) {
            alert("사용가능한 아이디입니다.");
            setBtnid(idEXP.test(join_id));
          }
          else{
            alert("중복된 아이디입니다.")
          }
        });
    }
    console.log("아이디 유효성", idEXP.test(join_id));
  };

  const nicknameoverlap = () => {
    if (nicknameEXP.test(join_nickname) === false) {
      alert("닉네임 양식에 맞춰 입력해주세요.");
    } else if (nicknameEXP.test(join_nickname) === true) {
      axios
        .get(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/nicknameCheck/" +
            inputs.join_nickname
        )
        .then(function (res) {
          //false면 가입불가능 true면 가입가능
          console.log(res.data.result);
          if (res.data.result === true) {
            alert("사용가능한 닉네임입니다.");
            setBtnNickname(nicknameEXP.test(join_nickname));
          }
          else{
            alert("중복된 닉네임입니다.")
          }
        });
    }

    console.log("아이디 유효성", idEXP.test(join_nickname));
  };

  const registeroverlap = () => {
    if(resister1Check === false || resister2Check === false){
        alert("주민등록번호를 입력해주세요.")
    } 
    else if (resister1Check === true && resister2Check === true) {
      axios
        .post(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/verify",
          {
            name: inputs.join_name,
            personalNumber: join_register1 + join_register2,
          }
        )
        .then(function (res) {
          if (res.data.result === true) {
            alert("실명인증이 완료되었습니다.");
            setbtnregister(true);
          }
        });
    }
  };

  const encryption = () => {
    const CryptoJS = require("crypto-js");
    encPassword = CryptoJS.AES.encrypt(join_password, "longhair").toString();
    encRegister = CryptoJS.AES.encrypt(
      join_register1 + join_register2,
      "longhair"
    ).toString();
  };

  const valueCheck = () => {
    // 1은 동의체크
    // 2는 빈칸/유효성 체크
    // 3은 닉네임 중복확인체크
    // 4는 아이디 중복확인체크
    // 5는 비밀번호 확인 체크
    // 6은 성명과 주민등록번호 인증 체크
    if (agreement !== true) {
      //동의
      alert("회원가입을 위한 개인정보 수집 및 이용안내사항을 동의해주세요.");
    } else if (nicknameCheck !== true) {
      alert("닉네임을 확인해주세요.");
    } else if (idCheck !== true) {
      alert("아이디를 확인해주세요.");
    } else if (passwordCheck !== true) {
      alert("비밀번호를 확인해주세요.");
    } else if (passwordconfirmCheck !== true) {
      alert("비밀번호 확인을 확인해주세요.");
    } else if (nameCheck !== true) {
      alert("성명을 확인해주세요");
    } else if (resister1Check !== true || resister2Check !== true) {
      alert("주민등록번호를 확인해주세요.");
    } else if (btnnickname !== true) {
      alert("닉네임을 중복확인해주세요.");
    } else if (btnid !== true) {
      alert("아이디를 중복확인해주세요.");
    } else if (btnregister !== true) {
      alert("실명 인증을 해주세요.");
    } else {
      //alert_blank=7;
      encryption();
      axios
        .post(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/register",
          {
            userId: join_id,
            password: encPassword,
            name: join_name,
            nickname: join_nickname,
            personalNumber: encRegister,
          }
        )
        .then(function (response) {
          console.log(response);
        });

      alert("회원가입이 완료되었습니다.");
      props.addPage("로그인");
    }

    console.log(
      agreement,
      nicknameCheck,
      idCheck,
      passwordCheck,
      passwordconfirmCheck,
      nameCheck,
      resister1Check,
      resister2Check
    );
  };

  return (
    <div className="Join-userdata-class">
      <div className="Join-checkbox-class">
        <input
          type="checkbox"
          name="join_agreement"
          onChange={onChange1}
          value={join_agreement}
          className="Join-checkbox-input-class"
          id="Join-checkbox-checkbox-id"
        ></input>
        <label
          className="Join-checkbox-text-class"
          htmlFor="Join-checkbox-checkbox-id"
        >
          동의합니다
        </label>
      </div>
      <div className="Join-usesrdata-nickname">
        <div className="Join-userdata-nickname-text-class">
          <div className="Textbox">
            <span className="Textbox-name-class" htmlFor="Textbox-class">
              닉네임
            </span>
            <input
              type="text1"
              name="join_nickname"
              value={join_nickname}
              onChange={onChange}
              className="Textbox-class"
            ></input>
          </div>
          <div
            className="Join-userdata-button-class1"
            onClick={nicknameoverlap}
          >
            <Common_Button name={"중복확인"}></Common_Button>
          </div>
        </div>

        <div
          className="Join-userdata-notice-class"
          style={nicknameCheck === true ? { color: "green" } : { color: "red" }}
        >
          <p>영문, 한글, 숫자 '-' 포함 2~20자 이내</p>
        </div>
      </div>

      <div className="Join-usesrdata-id-class">
        <div className="Join-userdata-nickname-text-class">
          <div className="Textbox">
            <span className="Textbox-name-class" htmlFor="Textbox-class">
              아이디
            </span>
            <input
              type="text1"
              name="join_id"
              value={join_id}
              onChange={onChange}
              className="Textbox-class"
            ></input>
          </div>
        </div>
        <div className="Join-userdata-button-class" onClick={idoverlap}>
          <Common_Button name={"중복확인"}></Common_Button>
        </div>
        <div
          className="Join-userdata-notice2-class"
          style={idCheck === true ? { color: "green" } : { color: "red" }}
        >
          <p>영문, 숫자 '-' 포함 5~20자 이내</p>
        </div>
      </div>
      <div className="Join-userdata-nickname-text-class">
        <div className="Textbox">
          <span className="Textbox-name-class" htmlFor="Textbox-class">
            비밀번호
          </span>
          <input
            type="text1"
            name="join_password"
            value={join_password}
            onChange={onChange}
            className="Textbox-class"
          ></input>
        </div>
      </div>
      <div
        className="Join-userdata-notice3-class"
        style={passwordCheck === true ? { color: "green" } : { color: "red" }}
      >
        <p>영문, 숫자 '~!@#$%^&*()_' 포함 8~16자 이내</p>
      </div>
      <div className="Join-userdata-nickname-text-class">
        <div className="Textbox">
          <span className="Textbox-name-class" htmlFor="Textbox-class">
            비밀번호 확인
          </span>
          <input
            type="text1"
            name="join_passwordconfirm"
            value={join_passwordconfirm}
            onChange={onChange}
            className="Textbox-class"
          ></input>
        </div>
      </div>
      <div
        className="Join-userdata-notice4-class"
        style={
          passwordconfirmCheck === true ? { color: "green" } : { color: "red" }
        }
      >
        {passwordconfirmCheck === true ? (
          <p>비밀번호가 일치합니다.</p>
        ) : (
          <p>비밀번호가 일치하지않습니다.</p>
        )}
      </div>
      <div className="Join-userdata-nickname-text-class">
        <div className="Textbox">
          <span className="Textbox-name-class" htmlFor="Textbox-class">
            성명
          </span>
          <input
            type="text1"
            name="join_name"
            value={join_name}
            onChange={onChange}
            className="Textbox-class"
          ></input>
        </div>
      </div>
      <div
        className="Join-userdata-notice5-class"
        style={nameCheck === true ? { color: "green" } : { color: "red" }}
      >
        <p>한글 포함 2~20자 이내</p>
      </div>
      <div className="Join-userdata-nickname-text-class">
        <div className="Textbox">
          <span className="Textbox-name-class" htmlFor="Textbox-class">
            주민등록번호
          </span>
          <input
            type="text1"
            maxLength="6"
            name="join_register1"
            value={join_register1}
            onChange={onChange}
            className="Textbox1-class"
          ></input>
          <p className="Join-userdata-register-p-class">-</p>
          <input
            type="text1"
            maxLength="7"
            name="join_register2"
            value={join_register2}
            onChange={onChange}
            className="Textbox1-class"
          ></input>
        </div>
      </div>
      <div className="Join-userdata-button-class" onClick={registeroverlap}>
        <Common_Button name={"인증"}></Common_Button>
      </div>
      <div className="Join-userdata-complete-btn-container-class">
        <div className="Join-userdata-complete-btn-class" onClick={valueCheck}>
          <Common_Button name={"가입완료"}></Common_Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Join_userdata);
