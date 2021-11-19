import React, { useState, useEffect } from "react";
import DIRECTEDIMG from '../../Img/DIRECTEDIMG.png';
import GOBACKBTN from '../../Img/DirectedIMG/arrow.png';
import Menu_left_nav from '../Common/Header/Menu_left_nav';
import { connect } from 'react-redux'
import { addPage } from '../../component/Modalmove/subscribers/action'
import DataPicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import S3Upload from "../Common/Function/S3fileUpload";
import './Directed_rewrite.css';
import BLOODDROP from '../../Img/DirectedIMG/blood-drop.png';
import Common_Button_IMG from '../../component/Common/Button/Common_Button_IMG';
import WRITEWHITEIMG from '../../Img/DirectedIMG/WRITE_WHITE.png';
import axios from "axios";
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';
import * as successAlert from "../Common/MakeAlert/successAlert.js"

function Directed_write(props) {
    const [startDate, setStartDate] = useState();
    const [endDate, setendDate] = useState(new Date());
    //헌혈증받는변수
    const [restatus, setRestatus] = useState(false);
    const [getData, setGetData] = useState();
    const [getIMG, setIMG] = useState(null);
    // const [titlecheck,setTitleCheck]=useState(false)
    // const [contextcheck,setContextCheck]=useState(false)
    // const [bloodtypecheck,setBloodCheck]=useState(false)
    // const [signal,setSignal]=useState(false)
    const [inputs, setInputs] = useState({
        direct_title: '',
        direct_context: '',

    })


    useEffect(() => {
        axios
            .get("http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/directedItem/" + sessionStorage.getItem("directId"))

            .then(function (response) {
              
                const firstinputs = {
                    direct_context: response.data.contents,
                    direct_title: response.data.title
                }
                setInputs(firstinputs)
                setIMG(response.data.img)
                setStartDate(response.data.periodFrom)
                setendDate(changedate(response.data.periodTo))
            });


    }, []);
    const onChange = (e) => {
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
    function changedate (inputdata){

        var redate="";
        for(var i in inputdata)
        {   if(inputdata[i]==="T")break;
            else 
            redate = redate+ inputdata[i];
        }
        
    const strArr = redate.split('-');

    const date = new Date(strArr[0], strArr[1]-1, strArr[2]);
        return date
    }
    function changedate2(input){

        var redate2=""
        for(var i in input)
        {   if(input[i]==="T")break;
            else 
            redate2 = redate2+ input[i];
        }
        return redate2;
    }
    function changeFormat(date, format) {
        if (moment(date).isValid()) {
            return moment(date).format(format);
        } else {
            return null;
        }
    }
    const senddata = () => {

        // console.log("requesterUserId:",sessionStorage.getItem("userId"),"title:",inputs.direct_title,"contents:",inputs.direct_context,"image:",getIMG,"locationSido:",getSido,"locationSigungu:",getSigungu,"periodFrom:",changeFormat(startDate, "yyyy-MM-DD"),"periodTo:",changeFormat(endDate, "yyyy-MM-DD"),"bloodType:",inputs.direct_bloodtype,"bloodMaxCount:",directCount,"patientName:",inputs.direct_patient,"hospitalName:",inputs.direct_hospital,"roomNumber:",inputs.direct_room,"phoneNumber:",inputs.direct_phonenumber)

        if (inputs.direct_title === "") {
            successAlert.errorAlert("제목을 넣어주세요")
        }
        else if (inputs.direct_context === "") {
            successAlert.errorAlert("내용을 넣어주세요")
        }

        else {
            axios.put("http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/directedItem/"+sessionStorage.getItem("directId"),{requesterUserId:sessionStorage.getItem("userId"),title:inputs.direct_title,contents:inputs.direct_context,image:getIMG,
            periodFrom:changeFormat(startDate, "yyyy-MM-DDT00:00:00"),periodTo:changeFormat(endDate, "yyyy-MM-DDT23:59:59"),
            completeStatus:restatus})
            .then(function (response) {
                      });
                      successAlert.successAlert("게시글이 수정되었습니다.")
                props.addPage("지정헌혈")

        }
   
    }


    const getfilename = (value) => {
        // console.log("wow",value)
        setIMG(value)
    }
    return (

        <div className="Directed-rewrite-container">
            {console.log("rewrite", inputs)}
            <div className="Directed-rewrite-nav-container">
                <div className="Directed-rewrite-nav-class">
                    <Menu_left_nav name={"지정헌혈"} imgname={DIRECTEDIMG}></Menu_left_nav>
                </div>
                <div className="Directed-rewrite-nav-goback">
                    <img className="Directed-rewrite-goback-bntimg-class" onClick={() => props.addPage("지정헌혈")} src={GOBACKBTN}></img>
                </div>
            </div>
            <div className="Directed-rewrite-content-container">
                <div className="Directed-rewrite-content-class" >
                    <div className="Directed-rewrite-card-class">
                        <div className="Dircected-rewrite-card-total">
                            <div className="Directed-rewrite-card-nav-class">
                                <input name="direct_title" className="Directed-rewrite-card-title-class" value={inputs.direct_title} onChange={onChange}>
                                </input>
                                <div className="Directed-rewrite-card-data-class">
                                    <div className="Directed-rewrite-calender1">
                                    <DataPicker locale={ko} value={changedate2(startDate)}  dateFormat="yyyy/MM/dd" minDate={changedate(startDate)} ></DataPicker> </div><div className="Directed-write-card-wow">~</div>
                                    <div className="Directed-rewrite-calender2"><DataPicker locale={ko} selected={endDate} dateFormat="yyyy/MM/dd" minDate={changedate(startDate)} onChange={date => setendDate(date)}></DataPicker></div>
                                </div>
                            </div>

                            <div className="Directed-rewrite-card-context-class">
                                <textarea name="direct_context" className="Directed-rewrite-card-context-input" value={inputs.direct_context} onChange={onChange}></textarea>
                            </div>
                            <div className="Directed-rewrite-card-footer-class">

                            </div>
                        </div>
                    </div>
                    <div className="Directed-rewrite-footer-container">
                        <div className="Directed-rewrite-footer-upload-container">
                            <div className="Directed-rewrite-footer-upload">
                                <S3Upload getfilename={getfilename} />
                            </div>
                        </div>
                        <div className="Directed-rewrite-status-container">
                            {restatus===false?
                            <div className="Directed-rewrite-status-class">
                                <div className="Directed-rewrite-status-ongoging">
                                        <img className="Directed-rewrite-status-img" src={BLOODDROP} />진행중
                                </div>
                                <div className="Directed-rewrite-status-stop" onClick={() => setRestatus(true)}>
                                    <img className="Directed-rewrite-status-img" src={BLOODDROP} /> 진행완료
                                </div>
                            </div>: <div className="Directed-rewrite-status-class">
                                <div className="Directed-rewrite-status-ongogingnot" onClick={() => setRestatus(false)}>
                                        <img className="Directed-rewrite-status-img" src={BLOODDROP} />진행중
                                </div>
                                <div className="Directed-rewrite-status-stopnot" >
                                    <img className="Directed-rewrite-status-img" src={BLOODDROP} /> 진행완료
                                </div>
                            </div>
                            }
                            {console.log(restatus)}
                        </div>



                        <div className="Directed-rewrite-btn-container">
                            <div className="Directed-rewrite-btn-class" onClick={senddata}>
                                <Common_Button_IMG name={"수정완료"} imgname={WRITEWHITEIMG} ></Common_Button_IMG>
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