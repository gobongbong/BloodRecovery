import React, { useState } from "react";
import DIRECTEDIMG from '../../Img/DIRECTEDIMG.png';
import GOBACKBTN from '../../Img/DirectedIMG/arrow.png';
import Menu_left_nav from '../Common/Header/Menu_left_nav';
import { connect } from 'react-redux'
import { addPage } from '../../component/Modalmove/subscribers/action'
import DataPicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import S3Upload from "../Common/Function/S3fileUpload";
import './Directed_write.css';
import BLOODDROP from '../../Img/DirectedIMG/blood-drop.png';
import LOCATIONIMG from '../../Img/DirectedIMG/location.png';
import Common_Button_IMG from '../../component/Common/Button/Common_Button_IMG';
import WRITEWHITEIMG from '../../Img/DirectedIMG/WRITE_WHITE.png';
import Directed_write_select from "./Directed_write_select";
import axios from "axios";
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';


function Directed_write(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    //헌혈증받는변수
    const [directCount, setDirectCount] = useState(0);
    const [getSido,setSido]=useState("서울특별시");
    const [getSigungu,setSigungu]=useState("종로구");
    const [getIMG,setIMG]=useState(null);
    // const [titlecheck,setTitleCheck]=useState(false)
    // const [contextcheck,setContextCheck]=useState(false)
    // const [bloodtypecheck,setBloodCheck]=useState(false)
    // const [signal,setSignal]=useState(false)
    const [inputs, setInputs] = useState({
        direct_title: '',
        direct_context:'',
        direct_bloodtype:'',
        direct_patient: '',
        direct_hospital: '',
        direct_room: '',
        direct_phonenumber:''
    })
   
    const onChange=(e)=>{
        const { name, value } = e.target   
        const nextInputs = {            
            //스프레드 문법으로 기존의 객체를 복사한다.
                     ...inputs,  
                     [name]: value,
                 }
            //만든 변수를 seInput으로 변경해준다.
                 setInputs(nextInputs)  
                 
                 console.log(inputs)
 
    }   
    //헌혈증카운트세는거
    function changeFormat(date, format) { 
        if (moment(date).isValid()) {
          return moment(date).format(format);
        } else {
          return null;
        }
      }
    const senddata=()=>{
        //console.log(getIMG)
        //console.log("requesterUserId:",sessionStorage.getItem("userId"),"title:",inputs.direct_title,"contents:",inputs.direct_context,"image:",getIMG,"locationSido:",getSido,"locationSigungu:",getSigungu,"periodFrom:",changeFormat(startDate, "yyyy-MM-DDT00:00:00"),"periodTo:",changeFormat(endDate, "yyyy-MM-DDT23:59:59"),"bloodType:",inputs.direct_bloodtype,"bloodMaxCount:",directCount,"patientName:",inputs.direct_patient,"hospitalName:",inputs.direct_hospital,"roomNumber:",inputs.direct_room,"phoneNumber:",inputs.direct_phonenumber)
    
        // console.log(changeFormat(endDate, "yyyy-MM-DD"))
    
        // setStartDate(changeFormat(startDate, "yyyy-MM-DD"))
        // setendDate(changeFormat(endDate, "yyyy-MM-DD"))
        if(inputs.direct_title===""){
            alert("제목을 넣어주세요")
        }
        else if(inputs.direct_context===""){
            alert("내용을 넣어주세요")
        }
        else if(inputs.direct_bloodtype===""){
            alert("내용을 넣어주세요")
        }
        else if(inputs.direct_patient===""){
            alert("내용을 넣어주세요")
        }
        else if(inputs.direct_hospital===""){
            alert("내용을 넣어주세요")
        }
        else if(inputs.direct_room===""){
            alert("내용을 넣어주세요")
        }
        else if(inputs.direct_phonenumber===""){
            alert("내용을 넣어주세요")
        }
        else{
            axios.post("http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/directedItem",{requesterUserId:sessionStorage.getItem("userId"),title:inputs.direct_title,
            contents:inputs.direct_context,image:getIMG,locationSido:getSido,locationSigungu:getSigungu,
            periodFrom:changeFormat(startDate, "yyyy-MM-DDT00:00:00"),periodTo:changeFormat(endDate, "yyyy-MM-DDT23:59:59"),bloodType:inputs.direct_bloodtype,bloodMaxCount:directCount,patientName:inputs.direct_patient,hospitalName:inputs.direct_hospital,roomNumber:inputs.direct_room,phoneNumber:inputs.direct_phonenumber})
            .then(function (response) {
                console.log(response);          });
                alert("게시글이 작성되었습니다.")
                props.addPage("지정헌혈")
           
        }


    }
    const countClick = (text) => {

        if (text === "countdown" && directCount > 0) {
            setDirectCount(directCount - 1)

        }
        else if (text === "countup" && directCount < 10) {

            setDirectCount(directCount + 1)
        }

    }
    const getValue=(text)=>{
        setSido(text)
        

    }
    const getValue2=(text)=>{
        setSigungu(text)
       

    }
    const getfilename=(value)=>{
        // console.log("wow",value)
        setIMG(value)
    }
    return (

        <div className="Directed-write-container">
            <div className="Directed-write-nav-container">
                <div className="Directed-write-nav-class">
                    <Menu_left_nav name={"지정헌혈"} imgname={DIRECTEDIMG}></Menu_left_nav>
                </div>
                <div className="Directed-write-nav-goback">
                    <img className="Directed-write-goback-bntimg-class" onClick={() => props.addPage("지정헌혈")} src={GOBACKBTN}></img>
                </div>
            </div>
            <div className="Directed-write-content-container">
                <div className="Directed-write-content-class" >
                    <div className="Directed-write-card-class">
                        <div className="Dircected-write-card-total">
                            <div className="Directed-write-card-nav-class">
                                <input name="direct_title" className="Directed-write-card-title-class" onChange={onChange}>
                                </input>
                                <div className="Directed-write-card-data-class">
                                    <div className="Directed-write-calender1">
                                    <DataPicker locale={ko} selected={startDate} dateFormat="yyyy/MM/dd" minDate={new Date()} onChange={date => setStartDate(date)}></DataPicker> </div><div className="Directed-write-card-wow">~</div>
                                    <div className="Directed-write-calender2"><DataPicker locale={ko} selected={endDate}dateFormat="yyyy/MM/dd" minDate={startDate} onChange={date => setendDate(date)}></DataPicker></div>
                                </div>
                            </div>

                            <div className="Directed-write-card-context-class">
                                <textarea name="direct_context" className="Directed-write-card-context-input" onChange={onChange}></textarea>
                            </div>
                            <div className="Directed-write-card-footer-class">

                            </div>
                        </div>
                    </div>
                    <div className="Directed-write-footer-container">
                        <div className="Directed-write-footer-upload-container">
                            <div className="Directed-write-footer-upload">
                                <S3Upload getfilename={getfilename}/>
                            </div>
                        </div>
                        <div className="Directed-write-footer-givecount-container">
                            <div className="Directed-write-footer-givecount">
                                <img src={BLOODDROP} className="Directed-write-footer-givecountimg"></img>
                                <div className="Directed-write-footer-givecounttext">
                                    지정헌혈 받을 횟수
                                </div>
                                <div className="Directed-write-footer-count-container">
                                    <div className="Directed_countdown" onClick={() => countClick("countdown")}>
                                        -
                                    </div>
                                    <div className="Directed_count">
                                        {directCount}
                                    </div>
                                    <div className="Directed_countup" onClick={() => countClick("countup")}>
                                        +
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Directed-write-footer-bloodtype-container">
                            <div className="Directed-write-footer-bloodtype-class">
                                <img src={BLOODDROP} className="Directed-write-footer-givecountimg"></img>
                                <div className="Directed-write-footer-bloodtypetext">
                                    지정헌혈 받을 혈액형
                                </div>
                                <input className="Directed-write-footer-bloodtypeinput" name="direct_bloodtype" onChange={onChange}></input>
                            </div>

                        </div>
                        <div className="Directed-write-footer-location-container">
                            <div className="Directed-write-footer-locatin-class">
                                <img src={LOCATIONIMG} className="Directed-write-footer-givecountimg"></img>
                                <div className="Directed-write-footer-locationtext">
                                    지정헌혈 받을 병원 위치
                                </div>
                                <div className="Directed-write-footer-locationselect">
                                    <Directed_write_select getValue={getValue} getValue2={getValue2}/>
                                    {console.log("get",getSido,"se",getSigungu)}
                                </div>
                            </div>
                        </div>
                        <div className="Directed-write-data-container">
                            <div className="Directed-write-data-class">
                                <div className="Directed-write-data-data1">
                                    <div className="Directed-write-data-text-p"> 지정헌혈 정보</div>
                                </div>
                                <div className="Directed-write-data-data2">
                                    <div className="Directed-write-data-data2text">환자 성명:</div>
                                    <input className="direct-patientname" name="direct_patient" onChange={onChange}></input>
                                </div>
                                <div className="Directed-write-data-data2">
                                <div className="Directed-write-data-data2text">의료기관명:</div>
                                <input className="direct-hopitalname" name="direct_hospital" onChange={onChange}></input>
                                </div>
                                <div className="Directed-write-data-data2">
                                <div className="Directed-write-data-data2text">병실호수:</div>
                                <input className="direct-roomnumber" name="direct_room" onChange={onChange}></input>
                                </div>
                                <div className="Directed-write-data-data2">
                                <div className="Directed-write-data-data2text"> 연락처:</div>
                                <input className="direct-phonenumber" name="direct_phonenumber" onChange={onChange}></input>
                                <div className="Directed-write-information-text">지정헌혈 신청자만 정보를 열람할 수 있습니다.</div>
                                </div>
                            </div>
                        </div>
                        <div className="Directed-write-btn-container">
                            <div className="Directed-write-btn-class" onClick={senddata}>
                                <Common_Button_IMG name={"작성완료"} imgname={WRITEWHITEIMG} ></Common_Button_IMG>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        page: state.page

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPage: (text) => dispatch(addPage(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Directed_write);