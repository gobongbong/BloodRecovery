import React, { useState } from "react";
import "./Header_nav.css";

const Header_nav = (props) => {
  const sendValue = (text) => {
    props.getsetValue(text);
  };
  const logout = () => {
   
    sessionStorage.removeItem("userId");
    props.logoutsuccess();
  };
  return (
    <div className="Header-nav-class">
      <div className="Header-nav-list-class">
        <div className="Header-nav-Login-class" onClick={logout}>
          로그아웃
        </div>
        <div
          className="Header-nav-Join-class"
          onClick={() => sendValue("마이페이지")}
        >
          마이페이지
        </div>
        <div
          className="Header-nav-Message-class"
          onClick={() => sendValue("메시지")}
        >
          메시지
        </div>
      </div>
    </div>
  );
};

export default Header_nav;