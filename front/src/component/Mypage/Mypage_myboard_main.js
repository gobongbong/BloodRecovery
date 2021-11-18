import React, { useEffect, useState } from "react";
import "./Mypage_myboard_main.css";
import Mypage_main from "./Mypage_main";
import { connect } from "react-redux";
import { addPage } from "../Modalmove/subscribers/action";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import axios from "axios";
import CARDDONATION from "../../Img/CARDDONATION.png";
import Mypage_card from "./Mypage_myboard_main_card";
import Directed_card from "./Directed_card"
import Board_card from "./Board_card";
import POCKETICON from "../../Img/pocket.png";
import DIRECTED from "../../Img/DirectedIMG/blood-donation.png"
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
const Mypage_myboard = (props) => {

  const [getData, setGetdata] = useState([]);
  const [getData2,setGetdata2]=useState();
  
  useEffect(() => {
    // 내가 쓴 헌혈증 기부 요청글 조회
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/card/" +
          sessionStorage.getItem("userId")
      )

      .then(function (response) {
        setGetdata(response.data);
      
      });
  }, []);

  useEffect(() => {
    // 내가 쓴 지정헌혈 요청글 조회
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/" +
          sessionStorage.getItem("userId")
      )

      .then(function (response) {
        setGetdata2(response);
        console.log("response1", response.data);
      });
  }, []);

  return (
    <div className="Mypage-myboard-container">
      <div className="Mypage-myboard-nav-container">
        <div className="Mypage-myboard-nav-class">
          <Menu_left_nav name={"마이페이지"} imgname={POCKETICON}></Menu_left_nav>
         
        </div>
        <img src={GOBACKBTN} className="Mypage-myboard-goback" onClick={()=>props.addPage("마이페이지")}></img>
      </div>
      <div className="Mypage-myboard-all-container">
        <div className="Mypage-myboard-board-container">
          <img src={CARDDONATION} className="Mypage-myboard-board-titleimg"/>
          <div className="Mypage-myboard-board-title">
            헌혈증기부
          </div>
          <div className="Mypage-myboard-board-cardarea">
        {getData.map((menu, index) => (
          <Board_card getData={getData[index]} key={index} what={"board"}>
            {console.log("index", index)}</Board_card>))}
            </div>
        </div>
        <div className="Mypage-myboard-direct-container">
        <img src={DIRECTED} className="Mypage-myboard-board-titleimg"/>
          <div className="Mypage-myboard-board-title">
            지정헌혈
          </div>
        <div className="Mypage-myboard-direct-cardarea">
        {getData2?.data.map((menu, index2) => (
          <Directed_card getData={getData2?.data[index2]} key={index2} what={"direct"}>
            {console.log("index", index2)}</Directed_card>))}
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
export default connect(mapStateToProps, mapDispatchToProps)(Mypage_myboard);
