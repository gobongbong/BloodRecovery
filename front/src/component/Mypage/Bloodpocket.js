import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Bloodpocket.css";
import GOBACKBTN from "../../Img/DirectedIMG/arrow.png";
import { addPage } from "../../component/Modalmove/subscribers/action";
import { connect } from "react-redux";
import Menu_nav_text from "../Common/Header/Menu_left_nav";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import POCKETICON from "../../Img/pocket.png";
import DIRECTED_BUTTON_IMG from "../../Img/DirectedIMG/DIRECTEDIMGWHITE.png";
import Common_Button_IMG from "../Common/Button/Common_Button_IMG";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import Bloodpocket_card from "./Bloodpocket_card";

function Bloodpocket_main(on) {
  const lysein =
    "U2FsdGVkX18jdsJLZTbKu8q6u5ElnD61jI+BZ8ULufIazll6ygQAqjNSPTNaPC1zeWo0r1UytTb4mjW42Vb/lQ==";
  const geinbge =
    "U2FsdGVkX1+w8ZdQnSFY13vz6GGRARaom3sjreiL0IPwzqB2E34+HHTwIfa61vvp";
  const fsesgs = "U2FsdGVkX194q5BrIV60z6bMqOomihEY7xSZGcnZtrg=";
  const gnkesg = "U2FsdGVkX1/le6BQQXav/Is2yrSyZxJ/oNDzfBSEFx0=";

  const CryptoJS = require("crypto-js");
  const gmbien = CryptoJS.AES.decrypt(geinbge, "longhair").toString(
    CryptoJS.enc.Utf8
  );
  const nsigh = CryptoJS.AES.decrypt(lysein, "longhair").toString(
    CryptoJS.enc.Utf8
  );
  const qwren = CryptoJS.AES.decrypt(fsesgs, "longhair").toString(
    CryptoJS.enc.Utf8
  );
  const ihtnw = CryptoJS.AES.decrypt(gnkesg, "longhair").toString(
    CryptoJS.enc.Utf8
  );

  AWS.config.update({
    accessKeyId: gmbien,
    secretAccessKey: nsigh,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: ihtnw },
    region: qwren,
  });

  const [end, setend] = useState(false);

  const [filename, getfilename] = useState("");

  const [carddata, setCarddata] = useState();
  //내가 가진 헌혈증 카드 조회
  const [card, setCard] = useState();

  const uploadFile = (file1, pp) => {
    const profile_params = {
      ACL: "public-read",
      Body: file1,
      Bucket: ihtnw,
      Key: "card/" + uuidv4() + "." + pp,
    };

    myBucket.putObject(profile_params, (err, data) => {
      alert("complete");
      getfilename(
        "https://bloodrecovery.s3.us-east-2.amazonaws.com/" + profile_params.Key
      );
      console.log("성공", profile_params.Key);
      console.log("에러", err);
      console.log("data", data);
    });

    setend(true);
    return (
      "https://bloodrecovery.s3.us-east-2.amazonaws.com/" + profile_params.Key
    );
  };

  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/bloodpocket/" +
          sessionStorage.getItem("userId")
      )
      .then(function (response) {
        setCard(response.data);
      });
  }, []);

  const sendinfo = (index) => {
    if (on.onbtn === "true") {
      axios
        .post(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/card/requests/requestItem/" +
            // "http://localhost:8003/requests/requestItem/"
            sessionStorage.getItem("boardId") +
            "/donation",
          {
            userId: sessionStorage.getItem("userId"),
            giveCount: 1,
            code: card[index].code,
          }
        )
        .then(function (res) {
          console.log("코드인가요?", card[index].code);
        });

      axios
        .put(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/" +
            card[index].id +
            "/" +
            // "http://localhost:8003/requests/requestItem/"
            on.number
        )
        .then(function (res) {});
      alert("기부가 완료되었습니다");
      on.endsg(false);
    }
    // else if(on.onbtn==="true1"){
    //   console.log("lod",card[index])//이거수정
    //   axios
    //   .post(
    //     "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/verify",
    //     {
    //       name: sessionStorage.getItem("userId"),
    //       personalNumber:"111111111"
    //     }
    //   )
    //   .then(function(res){
    //     if(res.data.result===true){

    //       axios
    //       .post(
    //         "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/directedItem/"+sessionStorage.getItem("directId")+"/apply",
    //         {
    //           userId: sessionStorage.getItem("userId"),
    //           date:card[index].date
    //         }

    //       )
    //       .then(function(res){
    //         console.log("결과는?")
    //       })
    //     }
    //   })
    // }
  };

  const onChange = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img);
    //console.log("img", img)

    const fileExt = img.name.split(".").pop();
    //console.log("img==", img)
    //setFilebuffer(fileExt);
    //
    // if(img.type !== 'image/png' || fileExt !=='png'){
    //   alert('jpg 파일만 Upload 가능합니다.');
    //   return;
    // }

    axios({
      method: "post",
      url: "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/ocr",
      data: formData,

      transformResponse: function (data) {
        console.log("log", JSON.parse(data).date);
        setCarddata(JSON.parse(data));

        // axios.post("http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/아이디1", {code:"18",image:null})
        // .then(function(res){
        //   console.log("업로드까지 끝")
        // })
        if (JSON.parse(data).code === null) {
          alert("code가 읽히지않았습니다. 다시 사진을 찍어주세요");
        } else {
          console.log("날짜가있었나요?", JSON.parse(data));
          axios
            .post(
              "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/apply",
              { code: JSON.parse(data).code }
            )
            .then(function (res) {
              console.log("trs", res); //bims 확인, s3이미지 업로드와 카드 등록하기
              if (res.data === true) {
                //s3이미지 업로드
                var im = uploadFile(img, fileExt);
                axios
                  .post(
                    "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/" +
                      sessionStorage.getItem("userId"),
                    { code: JSON.parse(data).code, image: im }
                  )
                  .then(function (res) {
                    console.log("업로드까지 끝");
                  });
              } else {
                alert("잘못된 헌혈증입니다.");
              }
            });
        }
      },
    });
  };

  return (
    <div className="Bloodpocket-main-container-class">
      <div className="Bloodpocket-main-nav-container">
        <div className="Bloodpocket-main-nav-class">
          <Menu_left_nav name={"내 지갑"} imgname={POCKETICON}></Menu_left_nav>
        </div>
        <img
          className="Bloodpocket-goback-bntimg-class"
          onClick={() => on.addPage("마이페이지")}
          src={GOBACKBTN}
        ></img>
      </div>
      <div className="Bloodpocket-main-context-container">
        <div className="Bloodpocket-main-context-card-container">
          <div className="Bloodpocket-main-context-card-register">
            <div className="Bloodpocket-main-context-card-card">
              <label
                className="Bloodpocket-main-context-card-text"
                htmlFor="fileuploading"
              >
                +
              </label>
              <input
                type="file"
                accept="image/*"
                style={{ visibility: "hidden" }}
                name="uploadimg"
                id="fileuploading"
                onChange={onChange}
                className="Bloodpocket-main-input"
              />
            </div>
          </div>
          {/* {card.map((menu,index)=>(card[index].id))} */}
          {card?.map((menu, index) => (
            <div
              className="Bloodpocket-card-wow"
              onClick={() => sendinfo(index)}
              style={on.onbtn === "true" ? { cursor: "pointer" } : null}
            >
              <Bloodpocket_card
                key={index}
                getindex={card[index]}
              ></Bloodpocket_card>
            </div>
          ))}
        </div>
        {console.log("filename", filename)}
      </div>
      <div className="Bloodpocket-footer-container">
        <div className="Bloodpocket-footer-btn-container"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bloodpocket_main);
