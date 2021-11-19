import React, { useState, useEffect } from "react";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import "./Directed_main.css";
import DIRECTEDIMG from "../../Img/DIRECTEDIMG.png";
import WRITEICON from "../../Img/WRITE.png";
import Directed_card from "./Directed_card";
import Directed_main_select from "./Directed_main_select";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import axios from "axios";
import * as successAlert from "../Common/MakeAlert/successAlert.js"
//0관리자 1
const Directed_main = (props) => {
  const [getSi, setGetSi] = useState("전체");
  const [getdo, setGetdo] = useState("");
  const [getData, setGetdata] = useState([]);
  const [selectStatus, setSelectStatus] = useState(false);
  const [frStatus, setfrStatus] = useState("진행중");
  const [inputs, setInputs] = useState({
    direct_main_bloodtype: "",
  });
  const SelectBox = () => {
    return (
      <select value={frStatus} onChange={handleChange}>
        <option key="진행중" value="진행중">
          진행중
        </option>
        <option key="진행완료" value="진행완료">
          진행완료
        </option>
      </select>
    );
  };
  const handleChange = (e) => {
    setfrStatus(e.target.value);
    if (e.target.value === "진행중") {
      setSelectStatus(false);
    } else if (e.target.value === "진행완료") {
      setSelectStatus(true);
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
     
      ...inputs,
      [name]: value,
    };
   
    setInputs(nextInputs);

  };


  const getsetValue2 = (getData) => {
    props.getsetValue2(getData);
  };

  useEffect(() => {
    if (inputs.direct_main_bloodtype === "") {
      if (getSi === "전체") {
        axios
          .get(
            "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct?status=" +
              selectStatus
          ) //status상태만붙여주고
          .then(function (response) {
            setGetdata(response.data);
          });
      } else {
        axios
          .get(
            "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct?sido=" +
              getSi +
              "&sigungu=" +
              getdo
          ) //status상태만붙여주고, 시도 붙여주기
          .then(function (response) {
            setGetdata(response.data);

          });
      }
    } else {
      if (getSi === "전체") {
        axios
          .get(
            "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct?bloodType=" +
              inputs.direct_main_bloodtype +
              "&status=" +
              selectStatus
          ) //status상태만붙여주고
          .then(function (response) {
            setGetdata(response.data);


          });
      } else {
        axios
          .get(
            "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct?bloodType=" +
              inputs.direct_main_bloodtype +
              "&sido=" +
              getSi +
              "&sigungu=" +
              getdo +
              "&status=" +
              selectStatus
          ) //status상태만붙여주고, 시도 붙여주기
          .then(function (response) {
            setGetdata(response.data);

  
          });
      }
    }
  }, [inputs, getSi, selectStatus, getdo]);

  const getValue = (text) => {
    setGetSi(text);
  };
  const getValue2 = (text) => {
    setGetdo(text);

  };

  return (
    <div className="Directed-main-container">
      <div className="Directed-main-nav-container">
        <div className="Directed-main-nav-class">
          <Menu_left_nav
            name={"지정헌혈"}
            imgname={DIRECTEDIMG}
          ></Menu_left_nav>
        </div>
        <div className="Directed-main-nav-search-class">
          <input
            type="text1"
            name="direct_main_bloodtype"
            onChange={onChange}
            className="Directed-main-input"
          ></input>
          {/* <div className="Directed-main-nav-searchicon-container">
                    <img src={SEARCHICON} onClick={searchData} className="Directed-main-nav-searchicon-class"></img>
                    </div> */}
        </div>
        <div className="Directed-main-nav-select-class">
          <SelectBox></SelectBox>
        </div>
        <div className="Directed-main-nav-select2-class">
          <Directed_main_select getValue={getValue} getValue2={getValue2} />
        </div>
        <div className="Directed-main-nav-write-class">
          <img
            src={WRITEICON}
            onClick={() =>
              sessionStorage.getItem("userId") !== null
                ? props.addPage("지정헌혈_글쓰기")
                : successAlert.errorAlert("로그인을 해주세요")
            }
            className="Directed-main-nav-writeicon-class"
          ></img>
        </div>
      </div>
      <div className="Directed-main-cardmain-container">
   
        {
          //워닝이뜨기떄문에 key값설정해야함
          getData.map((menu, index) => (<Directed_card getData={getData[index]} key={index} getsetValue3={getsetValue2}></Directed_card>))
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Directed_main);
