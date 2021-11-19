import React, { useEffect, useState } from "react";
import "./Directed_inquire_default_data.css";
import Common_Button_IMG from "../Common/Button/Common_Button_IMG";
import DIRECTED_BUTTON_IMG from "../../Img/DirectedIMG/DIRECTEDIMGWHITE.png";
import axios from "axios";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import * as successAlert from "../Common/MakeAlert/successAlert.js"

const Directed_inquire_default_data = (id) => {
  const [getData, setGetData] = useState();
  const [filename, getfilename] = useState("");
  const [rerender, setrerender] = useState(false);
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
  }, [getData]);

  const uploadFile = (file1, pp) => {
    const profile_params = {
      ACL: "public-read",
      Body: file1,
      Bucket: ihtnw,
      Key: "direct/" + uuidv4() + "." + pp,
    };

    myBucket.putObject(profile_params, (err, data) => {
      successAlert.successAlert("이미지 업로드가 완료되었습니다.");
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
  const dataURLtoFile = (dataurl, fileName) => {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }
  function filetoimg() {
    var dataURI
    var file = document.querySelector('#fileuploading');
    const fileExt = file?.files[0].name.split(".").pop();

    if(  fileExt.toLowerCase() === "png" ||
    fileExt.toLowerCase() === "jpeg" ||
    fileExt.toLowerCase()=== "jpg")
    {var fileList = file.files;
    // 읽기
    var reader = new FileReader();
    reader.readAsDataURL(fileList[0]);

    //로드 한 후
    reader.onload = function () {
      //로컬 이미지를 보여주기


      //썸네일 이미지 생성
      var tempImage = new Image(); //drawImage 메서드에 넣기 위해 이미지 객체화
      tempImage.src = reader.result; //data-uri를 이미지 객체에 주입
      tempImage.onload = function () {
        //리사이즈를 위해 캔버스 객체 생성
        var canvas = document.createElement('canvas');
        var canvasContext = canvas.getContext("2d");

        //캔버스 크기 설정
        canvas.width = 600; //가로 100px
        canvas.height = 600; //세로 100px

        //이미지를 캔버스에 그리기
        canvasContext.drawImage(this, 0, 0, 600, 600);
        //캔버스에 그린 이미지를 다시 data-uri 형태로 변환
        dataURI = canvas.toDataURL("image/jpeg");


        var file2 = dataURLtoFile(dataURI, 'file');
        const formData = new FormData();
        formData.append("file", file2);


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

                  
                  //   if(JSON.parse(data).date===""){
                  //     successAlert.errorAlert("헌혈증을 다시 인식해주세요.");
                  //   }
                  //   var beforedate=JSON.parse(data).date
                  //   var finaldate=""
                  //   for(var i=0; i<beforedate.length;i++)
                  //   {
                  //     if(beforedate[i]===" ")
                  //     {
                  //       continue;
                  //     }
                  //     else
                  //     finaldate=finaldate+beforedate[i]
                  //   }

                  //  beforedate=finaldate.split('.');

                  //   console.log(beforedate[0])
                  //   console.log(beforedate[1])
                  //   console.log(beforedate[2])
                  //   var senddate =beforedate[0]+'-'
                  //   if(beforedate[1]?.length>=2)
                  //   {
                  //     senddate=senddate+beforedate[1][0]+beforedate[1][1]+'-';
                  //   }
                  //   else{

                  //     senddate=senddate+'0'+beforedate[1][0]+'-';
                  //   }
                  //   if(beforedate[2].length>=2){

                  //     senddate=senddate+beforedate[2][0]+beforedate[2][1];
                  //   }
                  //   else{
                  //     senddate=senddate+'0'+beforedate[2][0]
                  //   }
                  var senddate = JSON.parse(data).date;
                  senddate = senddate + "T00:00:02Z"
             
                  axios
                    .post(
                      "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/directedItem/" +
                      sessionStorage.getItem("directId") +
                      "/apply",
                      {
                        userId: sessionStorage.getItem("userId"),
                        date: senddate,
                        code: JSON.parse(data).code
                      }
                    )
                    .catch(function (err) {

                      successAlert.errorAlert("헌혈증 인식을 실패했습니다. \n다시 인증해주세요")
                    })
                    .then(function (res) {

                      if (res?.data === true) {

                        //true로바꿔줘야함
                        var im = uploadFile(file2, fileExt);
                        axios
                          .post(
                            "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/" +
                            sessionStorage.getItem("userId"),
                            { code: JSON.parse(data).code, image: im }
                          )
                          .then(function (res) {
                            successAlert.successAlert("인증이 완료되었습니다.")

                          });
                      } else {
                        successAlert.errorAlert("잘못된 인증입니다.");

                      }
                    });

                },//여기


              });


            }
            setrerender(!rerender)
          });


      };

    };
  }
  else successAlert.errorAlert("png, jpeg, jpg 파일만 업로드 가능합니다.");

  }




  const onChange = (e) => {

    filetoimg()
    //console.log("img==", img)
    //setFilebuffer(fileExt);
    //
    // if(img.type !== 'image/png' || fileExt !=='png'){
    //   alert('jpg 파일만 Upload 가능합니다.');
    //   return;
    // }
    // axios
    //   .post(
    //     "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/verify",
    //     {
    //       name: sessionStorage.getItem("userId"),
    //       personalNumber: "111111111",
    //     }
    //   )
    //   .then(function (res) {
    //     if (res.data.result === true) {
    //       axios({
    //         method: "post",
    //         url: "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/ocr",
    //         data: formData,
    //         transformResponse: function (data) {
    //           console.log("log", JSON.parse(data).date);
    //           var senddate = "";
    //           for (
    //             var i = 0;
    //             i < 10;
    //             i++ //for(var i in JSON.parse(data).date)
    //           ) {
    //             if (JSON.parse(data).date[i] === ".") {
    //               senddate = senddate + "-";
    //             } else if (JSON.parse(data).date[i] === " ") {
    //               senddate = senddate + "0";
    //             } else senddate = senddate + JSON.parse(data).date[i];
    //           }
    //           senddate = senddate + "T00:00:00Z";
    //           console.log("senddate", senddate);
    //           axios
    //             .post(
    //               "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/directedItem/" +
    //                 sessionStorage.getItem("directId") +
    //                 "/apply",
    //               {
    //                 userId: sessionStorage.getItem("userId"),
    //                 date: senddate,
    //               }
    //             )
    //             .then(function (res) {
    //               console.log("과연결과는?", res.data);
    //               if (res.data === false) {
    //                 //true로바꿔줘야함
    //                 var im = uploadFile(img, fileExt);
    //                 axios
    //                   .post(
    //                     "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/mypage/card/" +
    //                       sessionStorage.getItem("userId"),
    //                     { code: JSON.parse(data).code, image: im }
    //                   )
    //                   .then(function (res) {
    //                     console.log("업로드까지 끝");
    //                   });
    //               } else {
    //                 alert("잘못된 인증입니다.");
    //               }
    //             });
    //         },
    //       });


    //     }
    //   });
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
            신청이 완료되었습니다. 기간내에 인증을 완료해주세요. <br />3번 이상 미인증시 패널티가 부여됩니다.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Directed_inquire_default_data;
