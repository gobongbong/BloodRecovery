import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Point_main.css";
import POINTICON from "../../Img/point.png";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
// import { addPage } from "../Modalmove/subscribers/action";
// import { connect } from "react-redux";
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
import { connect, ReactReduxContext } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";

//날짜 T이후로 쪼개는거
const dividedate = (inputdate) => {
  var redate = " ";
  for (var i in inputdate) {
    if (inputdate[i] == "T") break;

    redate = redate + inputdate[i];
  }
  return redate;
};

function Point_main(props, getData) {
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/point/" +
          sessionStorage.getItem("userId")
      )
      .then(function (response) {
        setUser(response);
       
      });
  }, []);

  const [nick, setNick] = useState();
  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/info/" +
          sessionStorage.getItem("userId")
      )
      .then(function (response) {
        setNick(response.data);
 
      });
  }, []);

  return (
    <div className="Point-main-container-class">
      <div className="Point-main-class">
        <div className="Point-main-Header-container-class">
          <Menu_left_nav
            name={"포인트 내역"}
            imgname={POINTICON}
          ></Menu_left_nav>

          <div className="Point-nav-goback">
            <img
              className="Point-goback-bntimg-class"
              onClick={() => props.addPage("마이페이지")}
              src={GOBACKBTN}
            ></img>
          </div>
        </div>
      </div>

      <div className="Point-main-nav-container"></div>
      <div className="Point-main-nav2">
        <p>{nick?.nickname}님의</p>
        현재 포인트 <b>{user?.data[0].currentPoint}</b>
      </div>
      <div className="Point-main">
        {/* 
        {user?.data.map((menu, index) => (
          <div className="Point-main-date">
            {dividedate(user?.data[index].date)}

            <div className="Point-main-plus-circle">
              <p>적립</p>
            </div>
          </div>
        ))} */}
        {user?.data.map((menu, index) => (
          <div className="Point-container">
            <div className="Point-main-date">
              {dividedate(user?.data[index].date)}
            </div>
            <div className="Point-current">
              {user?.data[index].currentPoint}
              <b>P</b>
            </div>
            <div className="Point-plus">{user?.data[index].plusPoint}</div>
            <div className="Point-minus">{user?.data[index].minusPoint}</div>
            <div className="Point-breakdown">{user?.data[index].breakdown}</div>
          </div>
        ))}
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
export default connect(mapStateToProps, mapDispatchToProps)(Point_main);
