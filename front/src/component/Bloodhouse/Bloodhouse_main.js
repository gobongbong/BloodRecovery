import React, { useState } from "react";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import BLOODHOUSEIMG from "../../Img/BloodhouseIMG/bloodhouse.png";
import Calendar from "react-calendar";
import "./Bloodhouse_main.css";
import Commonbtn from "../Common/Button/Common_Button_IMG";
// import 'react-calendar/dist/Calendar.css';
function Bloodhouse_main(props) {
  const [checkbtn, setcheckbtn] = useState("0900");
  const [checkblbtn, setcheckbltn] = useState("1");
  const [inputs, setInputs] = useState({
    bloodhousename: "",
  });
  const btncheck = (text) => {
    setcheckbtn(text);
  };
  const onchange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...inputs,
      [name]: value,
    };
    //만든 변수를 seInput으로 변경해준다.
    setInputs(nextInputs);
    console.log(inputs.bloodhousename);
  };
  const senddata = () => {
    if (inputs.bloodhousename === "") {
      alert("헌혈의 집 이름을 입력해주세요");
    } else alert("아직 준비중입니다.");
    // else alert("예약이 완료되었습니다.")
  };
  const [date, setDate] = useState(new Date());

  return (
    <div className="Bloodhouse-main-container">
      <div className="Bloodhouse-nav-container">
        <div className="Bloodhouse-nav-class">
          <Menu_left_nav name={"헌혈의 집"} imgname={BLOODHOUSEIMG} />
        </div>
      </div>
      <div className="Bloodhouse-content-container">
        <div className="Bloodhouse-content-class">
          <div className="Bloodhouse-content-where-container">
            <div className="Bloodhouse-content-text">헌혈의 집 선택</div>
            <input
              type="text2"
              name="bloodhousename"
              className="Bloodhouse-content-selecthouse"
              onChange={onchange}
            />
          </div>
          <div className="Bloodhouse-content-when-container">
            <div className="Bloodhouse-content-when-big">
              <div className="Bloodhouse-content-text">예약 날짜 선택</div>
              <div className="Bloodhouse-content-calendar-class">
                <Calendar onChange={setDate} value={date} />
              </div>
            </div>
            <div className="Bloodhouse-content-time-class">
              <div className="Bloodhouse-content-time-am">오전</div>
              <div className="Bloodhouse-content-time-amtime">
                <div
                  className="Bloodhouse-content-timelist_0900"
                  onClick={() => btncheck("0900")}
                  style={
                    checkbtn === "0900"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">9:00</div>
                </div>
                <div
                  className="Bloodhouse-content-timelist_0930"
                  onClick={() => btncheck("0930")}
                  style={
                    checkbtn === "0930"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">9:30</div>
                </div>
                <div
                  className="Bloodhouse-content-timelist_1000"
                  onClick={() => btncheck("1000")}
                  style={
                    checkbtn === "1000"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">10:00</div>
                </div>
                <div
                  className="Bloodhouse-content-time1030"
                  onClick={() => btncheck("1030")}
                  style={
                    checkbtn === "1030"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">10:30</div>
                </div>
                <div
                  className="Bloodhouse-content-time1100"
                  onClick={() => btncheck("1100")}
                  style={
                    checkbtn === "1100"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">11:00</div>
                </div>
                <div
                  className="Bloodhouse-content-time1130"
                  onClick={() => btncheck("1130")}
                  style={
                    checkbtn === "1130"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">11:30</div>
                </div>
              </div>
              <div className="Bloodhouse-content-time-pm">오후</div>
              <div className="Bloodhouse-content-time-pmtime">
                <div
                  className="Bloodhouse-content-timelist_1300"
                  onClick={() => btncheck("1300")}
                  style={
                    checkbtn === "1300"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">13:00</div>
                </div>
                <div
                  className="Bloodhouse-content-timelist_1330"
                  onClick={() => btncheck("1330")}
                  style={
                    checkbtn === "1330"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">13:30</div>
                </div>
                <div
                  className="Bloodhouse-content-timelist_1400"
                  onClick={() => btncheck("1400")}
                  style={
                    checkbtn === "1400"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">14:00</div>
                </div>
                <div
                  className="Bloodhouse-content-time1430"
                  onClick={() => btncheck("1430")}
                  style={
                    checkbtn === "1430"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">14:30</div>
                </div>
                <div
                  className="Bloodhouse-content-time1500"
                  onClick={() => btncheck("1500")}
                  style={
                    checkbtn === "1500"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">15:00</div>
                </div>
                <div
                  className="Bloodhouse-content-time1530"
                  onClick={() => btncheck("1530")}
                  style={
                    checkbtn === "1530"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">15:30</div>
                </div>
                <div
                  className="Bloodhouse-content-time1600"
                  onClick={() => btncheck("1600")}
                  style={
                    checkbtn === "1600"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">16:00</div>
                </div>
                <div
                  className="Bloodhouse-content-time1630"
                  onClick={() => btncheck("1630")}
                  style={
                    checkbtn === "1630"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">16:30</div>
                </div>
                <div
                  className="Bloodhouse-content-time1700"
                  onClick={() => btncheck("1700")}
                  style={
                    checkbtn === "1700"
                      ? { background: "#fd6f71", color: "white" }
                      : null
                  }
                  id="Bloodhousetime"
                >
                  <div className="Bloodhousetimetext">17:00</div>
                </div>
              </div>
            </div>
          </div>
          <div className="Bloodhouse-content-bloodtype-container">
            <div className="Bloodhouse-content-text">헌혈 종류 선택</div>
            <div className="Bloodhouse-content-bloodtype-button-class">
              <div
                className="Bloodhouse-content-bloodtype1"
                id="Bloodhousebloodtype"
                onClick={() => setcheckbltn("1")}
                style={
                  checkblbtn === "1"
                    ? { background: "#fd6f71", color: "white" }
                    : null
                }
              >
                <div className="bloodtext">전혈</div>
              </div>
              <div
                className="Bloodhouse-content-bloodtype1"
                id="Bloodhousebloodtype"
                onClick={() => setcheckbltn("2")}
                style={
                  checkblbtn === "2"
                    ? { background: "#fd6f71", color: "white" }
                    : null
                }
              >
                <div className="bloodtext">혈소판</div>
              </div>
              <div
                className="Bloodhouse-content-bloodtype1"
                id="Bloodhousebloodtype"
                onClick={() => setcheckbltn("3")}
                style={
                  checkblbtn === "3"
                    ? { background: "#fd6f71", color: "white" }
                    : null
                }
              >
                <div className="bloodtext">혈장</div>
              </div>
              <div
                className="Bloodhouse-content-bloodtype1"
                id="Bloodhousebloodtype"
                onClick={() => setcheckbltn("4")}
                style={
                  checkblbtn === "4"
                    ? { background: "#fd6f71", color: "white" }
                    : null
                }
              >
                <div className="bloodtext">혈소판혈장</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Bloodhouse-footer-container">
        <div className="Bloodhouse-footer-class" onClick={senddata}>
          <Commonbtn name={"예약하기"} />
        </div>
      </div>
    </div>
  );
}

export default Bloodhouse_main;
