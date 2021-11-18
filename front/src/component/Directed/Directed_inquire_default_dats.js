import React, { useEffect, useState } from "react";
import "./Directed_inquire_default_data.css";
import Common_Button_IMG from "../Common/Button/Common_Button_IMG";
import DIRECTED_BUTTON_IMG from "../../Img/DirectedIMG/DIRECTEDIMGWHITE.png";
import axios from "axios";
import ReactModal from "react-modal";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import Bloodpocket from "../Mypage/Bloodpocket";
const Directed_inquire_default_data = (id) => {
  const [getData, setGetData] = useState();
  const [filename, getfilename] = useState("");
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

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [modal, setmodal] = useState();
  // const modal_style1 = {
  //     overlay: {
  //       position: "fixed",
  //       top: 0,
  //       bottom: 0,
  //       left: 0,
  //       right: 0,
  //       backgroundColor: "rgba(0, 0, 0,0 )",
  //     },
  //     content: {
  //       left: 350,
  //       right: 350,
  //       top: 80,
  //       bottom: 80,
  //       zIndex: 0,
  //       padding: 10,
  //     },
  //   };

  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/directedItem/" +
          sessionStorage.getItem("directId") +
          "/patient"
      )

      .then(function (response) {
        setGetData(response);
      });
  }, []);
  // const btnon=()=>{
  //     console.log("?",id.id)
  //     setModalIsOpen(true)

  // }
  const uploadFile = (file1, pp) => {
    const profile_params = {
      ACL: "public-read",
      Body: file1,
      Bucket: ihtnw,
      Key: "direct/" + uuidv4() + "." + pp,
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

    return (
      "https://bloodrecovery.s3.us-east-2.amazonaws.com/" + profile_params.Key
    );
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
    axios
      .post(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/verify",
        {
          name: sessionStorage.getItem("userId"),
          personalNumber: "111111111",
        }
      )
      .then(function (res) {
        if (res.data.result === true) {
          axios({
            method: "post",
            url: "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/ocr",
            data: formData,
            transformResponse: function (data) {
              console.log("log", JSON.parse(data).date);
              var senddate = "";
              for (
                var i = 0;
                i < 10;
                i++ //for(var i in JSON.parse(data).date)
              ) {
                if (JSON.parse(data).date[i] === ".") {
                  senddate = senddate + "-";
                } else if (JSON.parse(data).date[i] === " ") {
                  senddate = senddate + "0";
                } else senddate = senddate + JSON.parse(data).date[i];
              }
              senddate = senddate + "T00:00:00Z";
              console.log("senddate", senddate);
              axios
                .post(
                  "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/directedItem/" +
                    sessionStorage.getItem("directId") +
                    "/apply",
                  {
                    userId: sessionStorage.getItem("userId"),
                    date: senddate,
                  }
                )
                .then(function (res) {
                  console.log("과연결과는?", res.data);
                  if (res.data === false) {
                    //true로바꿔줘야함
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
                    alert("잘못된 인증입니다.");
                  }
                });
            },
          });

          // axios.post("http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/아이디1", {code:"18",image:null})
          // .then(function(res){
          //   console.log("업로드까지 끝")
          // })
          // if (JSON.parse(data).code === null) { alert("code가 읽히지않았습니다. 다시 사진을 찍어주세요") }
          // else {

          //   console.log("날짜가있었나요?",JSON.parse(data))
          //   axios.post("http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/apply", {code:JSON.parse(data).code})
          //   .then(function (res) {
          //     console.log("trs",res)//bims 확인, s3이미지 업로드와 카드 등록하기
          //     if(res.data===true){ //s3이미지 업로드
          //       var im=uploadFile(img,fileExt)
          //       axios.post("http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/아이디1", {code:JSON.parse(data).code,image:im})
          //       .then(function(res){
          //         console.log("업로드까지 끝")
          //       })
          //     }
          //     else{alert("BIMS 조회 결과, 해당 정보가 없습니다.")}
          //    })
          // }
        }
      });
  };

  return (
    <div className="Directed-inquire-default-data-container">
      {/* <ReactModal
        style={modal_style1}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >  <Bloodpocket onbtn={"true1"} userid={id.id} ></Bloodpocket>  </ReactModal> */}
      <div className="Directed-inquire-default-class">
        <div className="Directed-inquire-default-data1">지정헌혈 정보</div>
        <div className="Directed-inquire-default-data2">
          환자 성명:{getData?.data.patientName}
        </div>
        <div className="Directed-inquire-default-data2">
          의료기관명:{getData?.data.hospitalName}
        </div>
        <div className="Directed-inquire-default-data2">
          병실호수:{getData?.data.roomNumber}
        </div>
      </div>
      <div className="Directed-inquire-default-btn-container">
        <div className="Directed-inquire-default-btn-class">
          <label
            className="Directed-Bloodpocket-main-context-card-text"
            htmlFor="fileuploading"
          >
            <Common_Button_IMG
              name={"인증하기"}
              imgname={DIRECTED_BUTTON_IMG}
            ></Common_Button_IMG>
          </label>
          <input
            type="file"
            accept="image/*"
            style={{ visibility: "hidden" }}
            name="uploadimg"
            id="fileuploading"
            onChange={onChange}
            className="Directed-Bloodpocket-main-input"
          />
        </div>
        <div className="Directed-inquire-default-info-container">
          <div className="Directed-inqire-default-info">
            요청 기간 이내에 지정헌혈 인증을 완료해주세요.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Directed_inquire_default_data;
