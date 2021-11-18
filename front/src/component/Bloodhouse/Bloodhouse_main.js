import React, { useState } from "react";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import BLOODHOUSEIMG from "../../Img/BloodhouseIMG/bloodhouse.png"
import Calendar from "react-calendar";
import "./Bloodhouse_main.css";
// import 'react-calendar/dist/Calendar.css';
function Bloodhouse_main(props) {
  const [date, setDate] = useState(new Date());

  return (
    <div className="Bloodhouse-main-container">
      <div className="Bloodhouse-nav-container">
        <div className="Bloodhouse-nav-class">
         <Menu_left_nav name={"헌혈의 집"} imgname={BLOODHOUSEIMG}/>
        </div>
      </div>
      <div className="Bloodhouse-content-container">
        <div className="Bloodhouse-content-class">
          <div className="Bloodhouse-content-where-container">
            <div className="Bloodhouse-content-text">헌혈의 집 선택</div>
            <input type="text2" className="Bloodhouse-content-selecthouse"/>
          </div>
          <div className="Bloodhouse-content-when-container">
       
            <div className="Bloodhouse-content-when-big">
            <div className="Bloodhouse-content-text">예약 날짜 선택</div>
            <div className="Bloodhouse-content-calendar-class">
              <Calendar onChange={setDate} value={date} />
            </div>
            </div>
            <div className="Bloodhouse-content-time-class">시간 부분</div>
          </div>
          <div className="Bloodhouse-content-bloodtype-container">
            <div className="Bloodhouse-content-text">헌혈 종류 선택</div>
            <div className="Bloodhouse-content-bloodtype-button-class">
              <button>전혈</button>
              <button>혈소판</button>
              <button>혈장</button>
              <button>혈소판혈장</button>
            </div>
          </div>
        </div>
      </div>
      <div className="Bloodhouse-footer-container">
        <div className="Bloodhouse-footer-class">
          <button className="Bloodhouse-footer-button-class">예약하기</button>
        </div>
      </div>
    </div>
  );
}

export default Bloodhouse_main;
