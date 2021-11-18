import React, { useState,useEffect } from "react";
import Test_img1 from "../../test/Test_img1.jpg";
import BEFORELOGIN from "../../Img/MainIMG/beforelogin.png";
import "./Main_rank.css";
import Main_rank_text from "./Main_rank_text";
import Main_rank_text_before from "./Main_rank_text_before";
import axios from "axios";
const Main_rank = (props) => {
  const [imgdata,setimgdata]=useState()
  const sendValue = (text) => {
    props.getsetValue(text);
  };
  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/info/" +
          sessionStorage.getItem("userId")
      )
      .then(function (response) {
        setimgdata(response.data);
      });
  }, [imgdata]);
  return (
    <div className="Main-rank-class">
      <div className="Main-rank-img-container">
        {sessionStorage.getItem("userId") === null ? (
          <img className="Main-rank-img-imgclass" src={BEFORELOGIN}></img>
        ) : (
          <img className="Main-rank-img-imgclass" src={imgdata?.profile===null?BEFORELOGIN:imgdata?.profile}></img>
        )}
      </div>
      <div className="Main-rank-text-container-class">
        <div className="Main-rank-text-class" onClick={() => sendValue("랭킹")}>
          {sessionStorage.getItem("userId") === null ? (
            <Main_rank_text_before></Main_rank_text_before>
          ) : (
            <Main_rank_text></Main_rank_text>
          )}
        </div>
      </div>
    </div>
  );
};

// const Main_rank=(props)=>
// {
//     const sendValue=()=>{
//         props.getsetValue("랭킹");
//     }

//     return(
//         <div className="Main_rank_img_class" onClick={sendValue}>
//             <img src={Test_img1}></img>
//             <Main_rank_text></Main_rank_text>
//         </div>
//     )

// }

export default Main_rank;
