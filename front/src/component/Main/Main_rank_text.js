import React, { useState, useEffect } from "react";
import "./Main_rank_text.css";
import axios from "axios";
const Main_rank_text = (props) => {
  const [myRank, setMyRank] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/rank/rankings/" +
          sessionStorage.getItem("userId")
      )
      .catch(function(error){
        
      })
      .then(function (response) {
        setMyRank(response?.data);
     
      });
 
  }, []);

  return (
    <div className="Main-rank-text-text-class">
      <div className="Main-rank-text-p-class">
        {myRank===undefined? <div>현재 순위 산정 중입니다.</div>:<div>현재 {myRank.nickname}님의 순위는 {myRank.userRank}위입니다.</div>}
      
      </div>
    </div>
  );
};

export default Main_rank_text;
